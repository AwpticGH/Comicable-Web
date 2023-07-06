class UsersReference {
    static #UID = "uid";
    static #EMAIL = "email";
    static #PASSWORD = "password";
    static #FIRST_NAME = "first_name";
    static #LAST_NAME = "last_name";
    static #VERIFIED = "verified";

    static get UID() {
        return this.#UID;
    }

    static get EMAIL() {
        return this.#EMAIL;
    }

    static get PASSWORD() {
        return this.#PASSWORD;
    }

    static get FIRST_NAME() {
        return this.#FIRST_NAME;
    }

    static get LAST_NAME() {
        return this.#LAST_NAME;
    }

    static get VERIFIED() {
        return this.#VERIFIED;
    }
}

module.exports = UsersReference;