const References = require("../../dictionary/database/References");
const CollectionModel = require("../../model/CollectionModel");
const CheckpointModel = require("../../model/CheckpointModel");
const {
    getDatabase,
    ref,
    child,
    push,
    set,
    get,
    update,
    remove
} = require("firebase/database")

class CheckpointController {

    async create(model) {
        let result = false;
        try {
            model.uid = push(ref(getDatabase(), References.CHECKPOINT)).key;
            await set(child(ref(getDatabase(), References.CHECKPOINT), model.uid), model.toJSON())
                .then(() => {
                    result = true;
                })
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async readAll(collectionModels) {
        let result = [];
        let snapshot;
        try {
            snapshot = await get(ref(getDatabase(), References.CHECKPOINT));
        } catch (error) {
            console.log(error);
        } finally {
            if (snapshot !== undefined && snapshot.exists()) {
                snapshot.forEach((data) => {
                    if (data.exists()) {
                        if (collectionModels !== undefined) { // read by collectionUid
                            for (let collectionModel of collectionModels) {
                                if (data.val().collection === collectionModel.uid) {
                                    result.push(data.val());
                                }
                            }
                        }
                    }
                });
            }
        }

        return result;
    }

    async read(collectionUid) {
        let result;
        let snapshot;
        try {
            snapshot = await get(ref(getDatabase(), References.CHECKPOINT));
        } catch (error) {
            console.log(error);
        } finally {
            if (snapshot !== undefined) {
                snapshot.forEach((data) => {
                    if (data.exists()) {
                        if (data.val().collection === collectionUid) {
                            result = data.val();
                        }
                    }
                });
            }
        }

        return result;
    }

    async update(model) {
        let result = false;
        try {
            await update(child(ref(getDatabase(), References.CHECKPOINT), model.uid), model)
                .then(() => {
                    result = true;
                });
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async delete(uid) {
        let result = false;
        try {
            await remove(child(ref(getDatabase(), References.CHECKPOINT), uid))
                .then(() => {
                    result = true;
                });
        } catch (error) {
            console.log(error);
        }

        return result;
    }
}

module.exports = CheckpointController;