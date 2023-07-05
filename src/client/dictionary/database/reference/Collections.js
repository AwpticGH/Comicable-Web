class Collections {
    static #COMIC = "comic";
    static #USER = "user";

    static get COMIC() {
        return this.#COMIC;
    }

    static get USER() {
        return this.#USER;
    }
}

module.exports = Collections;