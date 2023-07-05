const BASE_PATH = require("../../../../BasePath");
const Routes = require(`${BASE_PATH}/src/client/dictionary/web/Routes`);
const AuthModel = require(`${BASE_PATH}/src/client/model/AuthModel`);
const References = require(`${BASE_PATH}/src/client/dictionary/database/References`);
const {
    getDatabase, ref,
    child,
    get,
    push,
    set
} = require("firebase/database");
const SessionUtility = require(`${BASE_PATH}/src/client/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);
const AuthenticationConfig = require(`${BASE_PATH}/src/client/config/firebase/AuthenticationConfig`);

class DatabaseController {

    async read(uid) {
        let reference = ref(getDatabase(), References.AUTH);
        let childRef = child(reference, uid);
        return await get(childRef);
    }

    // Deprecated (will be using async ones later)
    // read(request, response, model) {
    //     let found = false;
    //
    //     if (model instanceof AuthModel) {
    //         let database = getDatabase();
    //         let reference = ref(database, References.AUTH);
    //         get(reference).then((snapshot) => {
    //             snapshot.forEach((dataSnapshot) => {
    //                 let email = dataSnapshot.val().email;
    //                 let password = dataSnapshot.val().password;
    //
    //                 if (email === model.getEmail) {
    //                     found = true;
    //                     if (password === model.getPassword) {
    //                         request.session[SessionVariables.AUTH_MODEL] = dataSnapshot.val();
    //                         request.session[SessionVariables.AUTH_MODEL][SessionVariables.UID] = dataSnapshot.key;
    //                         request.session.save();
    //                         response.redirect(Routes.HOME);
    //                     } else {
    //                         response.redirect(Routes.LOGIN);
    //                     }
    //
    //                     return true;
    //                 }
    //             })
    //             if (!found) {
    //                 response.redirect(Routes.LOGIN);
    //             }
    //         });
    //     }
    // }

    async emailExists(email) {
        let snapshot = await get(ref(getDatabase(), References.AUTH));

        let found = false;
        if (snapshot !== undefined && snapshot.exists()) {
            snapshot.forEach((dataSnapshot) => {
                if (dataSnapshot.val().email === email) {
                    found = true;
                }
            });
        }

        return found;
    }

    async create(model) {
        let result = false;
        if (model instanceof AuthModel) {
            model.uid = AuthenticationConfig.getCurrentUser().uid;
            try {
                await set(child(ref(getDatabase(), References.AUTH), model.uid), model.toJSON())
                    .then(async () => {
                        result = await this.emailExists(model.email);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        return result;
    }

}

module.exports = DatabaseController;