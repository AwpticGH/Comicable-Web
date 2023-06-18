const BASE_PATH = require("../../BasePath");
const Routes = require(`${BASE_PATH}/src/dictionary/web/Routes`);
const AuthModel = require(`${BASE_PATH}/src/model/AuthModel`);
const References = require(`${BASE_PATH}/src/dictionary/database/References`);
const { getDatabase, ref, get } = require("firebase/database");
const SessionUtility = require(`${BASE_PATH}/src/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/dictionary/web/SessionVariables`);

class AuthController {

    read(request, response, model) {
        let found = false;

        if (model instanceof AuthModel) {
            console.log("Email : " + model.getEmail);
            console.log("Password : " + model.getPassword);
            console.log("Retrieving Database");
            let database = getDatabase();
            console.log("Retrieved Database, Initializing Reference");
            let reference = ref(database, References.AUTH);
            console.log("Initialized Reference, Getting First Snapshot");
            get(reference).then((snapshot) => {
                console.log("Snapshot Gotten, Iterating Snapshots");
                snapshot.forEach((dataSnapshot) => {
                    console.log("---Child Snapshot Information---");
                    console.log("Key : " + dataSnapshot.key);
                    console.log("---Getting Values---");
                    let email = dataSnapshot.val().email;
                    let password = dataSnapshot.val().password;

                    console.log("Found Email : " + email);
                    console.log("Found Password : " + password);

                    if (email === model.getEmail) {
                        found = true;
                        console.log("Email Found, Checking Password");
                        if (password === model.getPassword) {
                            console.log("Password Is Equal, Storing To Session");

                            request.session[SessionVariables.AUTH_MODEL] = dataSnapshot.val();
                            request.session.save();
                            console.log("Saved To Session, Redirecting To Home");
                            response.redirect(Routes.HOME);
                        }
                        else {
                            console.log("Credentials Incorrect!!!");
                            response.redirect(Routes.LOGIN);
                        }

                        return true;
                    }
                })
                if (!found) {
                    response.redirect(Routes.LOGIN);
                }
            });
        }
    }

}

module.exports = AuthController;