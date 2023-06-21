const BaseModel = require("./BaseModel");

class CollectionModel extends BaseModel {
    #comic;
    #user;

    constructor() {
        super();
    }

    get getComic() {
        return this.#comic;
    }

    set setComic(comic) {
        this.#comic = comic;
    }

    get getUser() {
        return this.#user;
    }

    set setUser(user) {
        this.#user = user;
    }
}

module.exports = CollectionModel;