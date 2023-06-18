const BaseModel = require("./BaseModel");

class CollectionModel extends BaseModel {
    #comic;
    #user;

    constructor() {
        super();
    }

    constructor(comic, user) {
        super();
        this.#comic = comic;
        this.#user = user;
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