const Routes = require("../dictionary/web/Routes");

const SessionVariables = require("../dictionary/web/SessionVariables");
const WebVariables = require("../dictionary/web/WebVariables");
const AuthModel = require("../model/AuthModel");
const DatabaseController = require("../controller/users/DatabaseController");
const AuthenticationController = require("../controller/users/AuthenticationController");
const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");

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
        request.session[WebVariables.ALERT] = "Email Exists In The Database!";
        response.redirect(Routes.REGISTER_1);
    }
});

router.post(Routes.REGISTER_2, async (request, response) => {
    let email = request.body[WebVariables.EMAIL];
    let password = request.body[WebVariables.PASSWORD];
    let passwordConfirmation = request.body[WebVariables.PASSWORD_CONFIRMATION];
    let firstName = request.body[WebVariables.FIRST_NAME];
    let lastName = request.body[WebVariables.LAST_NAME];

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
                    await authenticationController.updateProfile(model.first_name, null)
                        .then(() => {
                            updated = AuthenticationConfig.hasDisplayName();
                        });
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
                                request.session[WebVariables.ALERT] = "Register Success!";
                                request.session[SessionVariables.AUTH_MODEL] = model;
                            }
                            else {
                                request.session[WebVariables.ALERT] = "Failed To Register Several Data To Database. Please Verify Account So That You Can Log In Next Time!";
                            }
                            response.redirect(Routes.HOME);
                        }
                    } else {
                        request.session[WebVariables.ALERT] = "Failed To Register Several Data To Database. Please Verify Account So That You Can Log In Next Time!";
                        response.redirect(Routes.REGISTER_1);
                    }
                }
            } else {
                request.session[WebVariables.ALERT] = "Failed To Register, Please Try Again Later!";
                response.redirect(Routes.REGISTER_1);
            }
        }

    }
    else {
        request.session[WebVariables.ALERT] = "Passwords Does Not Match, Please Try Again!";
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
            request.session[WebVariables.ALERT] = "Login Success!";
            response.redirect(Routes.HOME);
        }
        else {
            request.session[WebVariables.ALERT] = "Login Failed!";
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

module.exports = router;