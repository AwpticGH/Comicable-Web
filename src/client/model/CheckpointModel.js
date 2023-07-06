const BaseModel = require("./BaseModel");

class CheckpointModel extends BaseModel {
    #uid;
    #collection;
    #endpoint;

    constructor() {
        super();
    }

    get uid() {
        return this.#uid;
    }

    set uid(value) {
        this.#uid = value;
    }

    get collection() {
        return this.#collection;
    }

    set collection(value) {
        this.#collection = value;
    }

    get endpoint() {
        return this.#endpoint;
    }

    set endpoint(value) {
        this.#endpoint = value;
    }

    toJSON() {
        return {
            uid: this.uid,
            collection: this.collection,
            endpoint: this.endpoint
        }
    }
}

module.exports = CheckpointModel;