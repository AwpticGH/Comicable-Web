class CollectionModel {
    #comic;
    #user;

    constructor() {
    }

    constructor(comic, user) {
        this.comic = comic;
        this.user = user;
    }

    get getComic() {
        return this.comic;
    }

    set setComic(comic) {
        this.comic = comic;
    }

    get getUser() {
        return this.user;
    }

    set setUser(user) {
        this.user = user;
    }
}

module.exports = CollectionModel;