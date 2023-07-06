const CollectionModel = require("../../model/CollectionModel");
const References = require("../../dictionary/database/References");
const AuthenticationConfig = require("../../config/firebase/AuthenticationConfig");
const {
    getDatabase,
    set,
    get,
    ref,
    push,
    child,
    remove
} = require("firebase/database");

class CollectionController {

    async create(model) {
        let result = false;
        if (model instanceof CollectionModel) {
            try {
                model.uid = push(ref(getDatabase(), References.COLLECTION)).key;
                await set(child(ref(getDatabase(), References.COLLECTION), model.uid), model.toJSON())
                    .then(() => {
                        result = true;
                    });
            } catch (error) {
                console.log(error);
            }
        }

        return result;
    }

    async read(uid) {
        let result;
        let snapshot;
        try {
            snapshot = await get(ref(getDatabase(), References.COLLECTION));
        } catch (error) {
            console.log(error);
        } finally {
            if (snapshot !== undefined && snapshot.exists()) {
                if (uid === undefined) {
                    result = [];
                }
                let debug = 0;
                snapshot.forEach((data) => {
                    if (data.exists()) {
                        if (uid !== undefined) { // read specific collection
                            if (data.val().user === AuthenticationConfig.getCurrentUser().uid && data.val().uid === uid) {
                                result = data.val();
                            }
                        } else { // read all
                            if (data.val().user === AuthenticationConfig.getCurrentUser().uid) {
                                result.push(data.val());
                            }
                        }
                    }
                });
            }
        }

        return result;
    }

    async readByTitle(title) {
        let result;
        let snapshot;
        try {
            snapshot = await get(ref(getDatabase(), References.COLLECTION));
        } catch (error) {
            console.log(error);
        } finally {
            if (snapshot !== undefined && snapshot.exists()) {
                snapshot.forEach((data) => {
                    if (data.exists()) {
                        if (data.val().user === AuthenticationConfig.getCurrentUser().uid && data.val().title === title) {
                            result = data.val();
                        }
                    }
                });
            }
        }

        return result;
    }

    async readByEndpoint(endpoint) {
        let result;
        let snapshot;
        try {
            snapshot = await get(ref(getDatabase(), References.COLLECTION));
        } catch (error) {
            console.log(error);
        } finally {
            if (snapshot !== undefined && snapshot.exists()) {
                snapshot.forEach((data) => {
                    if (data.exists()) {
                        if (data.val().user === AuthenticationConfig.getCurrentUser().uid && data.val().endpoint === endpoint) {
                            result = data.val();
                        }
                    }
                });
            }
        }

        return result;
    }

    async delete(uid) {
        let result = false;
        try {
            await remove(child(ref(getDatabase(), References.COLLECTION), uid))
                .then(() => {
                    result = true;
                });
        } catch (error) {
            console.log(error);
        }

        return result;
    }
}

module.exports = CollectionController;