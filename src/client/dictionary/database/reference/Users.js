class Users {
    static #ADDRESS = "address";
    static #EMAIL = "email";
    static #NAME = "name";
    static #PASSWORD = "password";
    static #PHONE_NUMBER = "phone_number";
    static #VERIFIED = "verified";

    static get ADDRESS() {
        return this.#ADDRESS;
    }

    static get EMAIL() {
        return this.#EMAIL;
    }

    static get NAME() {
        return this.#NAME;
    }

    static get PASSWORD() {
        return this.#PASSWORD;
    }

    static get PHONE_NUMBER() {
        return this.#PHONE_NUMBER;
    }

    static get VERIFIED() {
        return this.#VERIFIED;
    }
}

module.exports = Users;