const BASE_PATH = require("../../../../BasePath");
const Routes = require(`${BASE_PATH}/src/client/dictionary/web/Routes`);
const AuthModel = require(`${BASE_PATH}/src/client/model/AuthModel`);
const References = require(`${BASE_PATH}/src/client/dictionary/database/References`);
const { getDatabase, ref, child, get } = require("firebase/database");
const SessionUtility = require(`${BASE_PATH}/src/client/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);
const AuthenticationConfig = require(`${BASE_PATH}/src/client/config/firebase/AuthenticationConfig`);

class DatabaseController {

    // async read(request, response) {
    //     let uid = AuthenticationConfig.getUser().UID;
    //     let authModel = undefined;
    //
    //     let reference = ref(getDatabase(), References.AUTH);
    //     let childRef = child(reference, uid);
    //     await get(childRef).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             authModel = new AuthModel();
    //             authModel.email = snapshot.val().email;
    //             authModel.password = snapshot.val().password;
    //             authModel.first_name = snapshot.val().first_name;
    //             authModel.last_name = snapshot.val().last_name;
    //         }
    //     });
    //
    //     return authModel;
    // }

    // Deprecated (will be using async ones later)
    read(request, response, model) {
        let found = false;

        if (model instanceof AuthModel) {
            let database = getDatabase();
            let reference = ref(database, References.AUTH);
            get(reference).then((snapshot) => {
                snapshot.forEach((dataSnapshot) => {
                    let email = dataSnapshot.val().email;
                    let password = dataSnapshot.val().password;

                    if (email === model.getEmail) {
                        found = true;
                        if (password === model.getPassword) {
                            request.session[SessionVariables.AUTH_MODEL] = dataSnapshot.val();
                            request.session[SessionVariables.AUTH_MODEL][SessionVariables.UID] = dataSnapshot.key;
                            request.session.save();
                            response.redirect(Routes.HOME);
                        } else {
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

    create(request, response) {

    }

}

module.exports = DatabaseController;