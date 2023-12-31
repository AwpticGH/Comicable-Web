const BaseModel = require("./BaseModel");

class CollectionModel extends BaseModel {
    #uid;
    #title;
    #endpoint;
    #user;

    constructor() {
        super();
    }

    get uid() {
        return this.#uid;
    }

    set uid(value) {
        this.#uid = value;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get endpoint() {
        return this.#endpoint;
    }

    set endpoint(value) {
        this.#endpoint = value;
    }

    get user() {
        return this.#user;
    }

    set user(value) {
        this.#user = value;
    }

    toJSON() {
        return {
            uid: this.uid,
            title: this.title,
            endpoint: this.endpoint,
            user: this.user
        }
    }
}

module.exports = CollectionModel;