const Routes = require("../dictionary/web/Routes");

const SessionVariables = require("../dictionary/web/SessionVariables");
const WebVariables = require("../dictionary/web/WebVariables");
const AuthModel = require("../model/AuthModel");
const DatabaseController = require("../controller/users/DatabaseController");
const AuthenticationController = require("../controller/users/AuthenticationController");
const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");
const AuthFlag = require("../flag/AuthenticationFlag");

const express = require("express");
const router = express.Router();

let authenticationController = new AuthenticationController();
let databaseController = new DatabaseController();

router.get(Routes.LOGIN, (request, response) => {
    response.render("auth/login", {
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Login"
    });
});

router.get(Routes.REGISTER_1, (request, response) => {
    response.render("auth/register1", {
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Register Email"
    });
});

router.get(Routes.REGISTER_2, async (request, response) => {
    let emailExists = await databaseController.emailExists(request.query[WebVariables.EMAIL]);

    if (!emailExists) {
        response.locals[WebVariables.EMAIL] = request.query[WebVariables.EMAIL];
        response.render("auth/register2", {
            layout: "layout/main",
            css_file: "masuk_daftar",
            page_title: "Register Password"
        });
    } else {
        request.session[SessionVariables.ALERT] = "Email Exists In The Database!";
        response.redirect(Routes.REGISTER_1);
    }
});

router.post(Routes.REGISTER_2, async (request, response) => {
    let email = request.body[WebVariables.EMAIL];
    let password = request.body[WebVariables.PASSWORD];
    let passwordConfirmation = request.body[WebVariables.PASSWORD_CONFIRMATION];
    let firstName = request.body[WebVariables.FIRST_NAME];
    let lastName = request.body[WebVariables.LAST_NAME];

    if (email !== undefined
        && password !== undefined
        && passwordConfirmation !== undefined
        && firstName !== undefined && lastName !== undefined
    ) {
        if (password === passwordConfirmation) {
            let model = new AuthModel();
            model.email = email;
            model.password = password;
            model.first_name = firstName;
            model.last_name = lastName;
            model.verified = false;

            let registeredAuth = false;
            let registeredData = false;
            let updated = false;
            try {
                registeredAuth = await authenticationController.register(model.email, model.password);
            } catch (error) {
                console.log(error);
            } finally {
                if (registeredAuth) {
                    try {
                        updated = await authenticationController.updateProfile(model.first_name, null);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        if (updated) {
                            try {
                                registeredData = await databaseController.create(model);
                            } catch (error) {
                                console.log(error);
                            } finally {
                                if (registeredData) {
                                    request.session[SessionVariables.ALERT] = "Register Success!";
                                    request.session[SessionVariables.AUTH_MODEL] = model;
                                }
                                else {
                                    request.session[SessionVariables.ALERT] = "Failed To Register Several Data To Database. Please Verify Account So That You Can Log In Next Time!";
                                }
                                response.redirect(Routes.HOME);
                            }
                        } else {
                            request.session[SessionVariables.ALERT] = "Failed To Register Several Data To Database. Please Verify Account So That You Can Log In Next Time!";
                            response.redirect(Routes.REGISTER_1);
                        }
                    }
                } else {
                    request.session[SessionVariables.ALERT] = "Failed To Register, Please Try Again Later!";
                    response.redirect(Routes.REGISTER_1);
                }
            }

        }
        else {
            request.session[SessionVariables.ALERT] = "Passwords Does Not Match, Please Try Again!";
            response.redirect(Routes.REGISTER_2);
        }
    } else {
        request.session[SessionVariables.INPUT_EMAIL] = email;
        request.session[SessionVariables.INPUT_FIRST_NAME] = firstName;
        request.session[SessionVariables.INPUT_LAST_NAME] = lastName;

        response.redirect(Routes.REGISTER_2);
    }
});

router.post(Routes.LOGIN, async (request, response) => {
    let email = request.body[WebVariables.EMAIL];
    let password = request.body[WebVariables.PASSWORD];

    let model = new AuthModel();
    model.email = email;
    model.password = password;

    let result = null;
    try {
        result = await authenticationController.login(model.email, model.password);
    } catch (e) {
        console.log(e);
    } finally {
        if (result !== null) {
            model = await databaseController.read(AuthenticationConfig.getCurrentUser().uid);
            request.session[SessionVariables.AUTH_MODEL] = model;
            response.redirect(Routes.HOME);
        }
        else {
            request.session[SessionVariables.INPUT_EMAIL] = email;
            request.session[SessionVariables.ALERT] = "Login Failed!";
            response.redirect(Routes.LOGIN);
        }
    }
});

router.get(Routes.LOGOUT, async (request, response) => {
    let result = await authenticationController.logout();
    if (result) {
        request.session[SessionVariables.AUTH_MODEL] = undefined;
    }
    response.redirect(Routes.HOME);
});

router.post(Routes.UPDATE_AUTH, async (request, response) => {
    let password = request.body[WebVariables.PASSWORD];
    let firstName = request.body[WebVariables.FIRST_NAME];
    let lastName = request.body[WebVariables.LAST_NAME];

    let authModel = request.session[SessionVariables.AUTH_MODEL];

    let updatedProfile = false;
    let updatedPassword = false;
    if (firstName !== authModel.first_name) { // updating first_name
        try {
            await authenticationController.updateProfile(firstName, null)
                .then((isUpdated) => {
                    if (isUpdated) {
                        updatedProfile = AuthFlag.verifyDisplayName(authModel.first_name);
                    }
                });
        } catch (error) {
            console.log(error);
        } finally {
            if (updatedProfile) { // updated profile
                if (password !== authModel.password) { // updating password
                    try {
                        updatedPassword = await authenticationController.updatePassword(password);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        if (updatedPassword) { // updated password
                            authModel.password = password;
                            authModel.first_name = firstName;
                            authModel.last_name = lastName;

                            // updating database
                            await updateDatabase(request, authModel);
                        } else { // failed to update passord
                            request.session[SessionVariables.ALERT] = "Failed To Update Password, Please Try Again";
                        }
                    }
                } else { // not updating password
                    authModel.first_name = firstName;
                    authModel.last_name = lastName;

                    // updating database
                    await updateDatabase(request, authModel);
                }
            } else { // failed to update profile
                request.session[SessionVariables.ALERT] = "Failed To Update Account, Please Try Again!";
            }
        }
    } else { // not updating profile
        if (password !== authModel.password) { // updating password
            updatedPassword = await updatePassword(request, password);
            if (updatedPassword) { // updated password
                authModel.password = password;
                authModel.last_name = lastName;

                // updating database
                await updateDatabase(request, authModel);
            } else { // failed to update password
                request.session[SessionVariables.ALERT] = "Failed To Update Password, Please Try Again";
            }
        } else { // not updating password
            authModel.last_name = lastName;
            await updateDatabase(request, authModel);
        }
    }
    response.redirect(Routes.HOME);
});

const updateDatabase = async (request, model) => {
    let result = false;
    try {
        await databaseController.update(model)
            .then(() => {
                result = true;
            });
    } catch (error) {
        console.log(error);
    } finally {
        if (result) { // updated database
            request.session[SessionVariables.ALERT] = "Successfully Updated Profile";
        } else { // failed to update database
            request.session[SessionVariables.ALERT] = "Failed To Update Data to Database, Please Try Again!";
        }
    }
}

const updatePassword = async (request, value) => {
    let result = false;
    try {
        result = await authenticationController.updatePassword(value);
    } catch (error) {
        console.log(error);
    }

    return result;
}

module.exports = router;