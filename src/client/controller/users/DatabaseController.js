const AuthModel = require("../../model/AuthModel");
const References = require("../../dictionary/database/References");
const AuthenticationConfig = require("../../config/firebase/AuthenticationConfig");
const {
    getDatabase, ref,
    child,
    get,
    push,
    set,
    update
} = require("firebase/database");

class DatabaseController {

    async read(uid) {
        let reference = ref(getDatabase(), References.AUTH);
        let childRef = child(reference, uid);
        return await get(childRef);
    }

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

    async update(model) {
        let result = false;
        if (model instanceof AuthModel) {
            try {
                await update(child(ref(getDatabase(), References.AUTH), model.uid), model)
                    .then(() => {
                        result = true;
                    });
            } catch (error) {
                console.log(error);
            }
        }

        return result;
    }

}

module.exports = DatabaseController;