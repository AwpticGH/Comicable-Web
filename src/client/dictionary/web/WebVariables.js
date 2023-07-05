class WebVariables {
    static #ALERT = "my-alert";
    static #EMAIL = "user-email";
    static #PASSWORD = "user-password";
    static #PASSWORD_CONFIRMATION = "user-password-confirmation";
    static #FIRST_NAME = "user-first-name";
    static #LAST_NAME = "user-last-name";
    static #PHONE_NUMBER = "user-phone-number";
    static #ADDRESS = "user-address";
    static #IMAGE = "user-image";
    static #DATE_OF_BIRTH = "user-date-of-birth";
    static #UID = "user-uid";
    static #SEARCH_QUERY = "query";
    static #SEARCH_PAGE ="page";

    static get ALERT() {
        return this.#ALERT;
    }

    static get EMAIL() {
        return this.#EMAIL;
    }

    static get PASSWORD() {
        return this.#PASSWORD;
    }

    static get PASSWORD_CONFIRMATION() {
        return this.#PASSWORD_CONFIRMATION;
    }

    static get FIRST_NAME() {
        return this.#FIRST_NAME;
    }

    static get LAST_NAME() {
        return this.#LAST_NAME;
    }

    static get PHONE_NUMBER() {
        return this.#PHONE_NUMBER;
    }

    static get ADDRESS() {
        return this.#ADDRESS;
    }

    static get IMAGE() {
        return this.#IMAGE;
    }

    static get DATE_OF_BIRTH() {
        return this.#DATE_OF_BIRTH;
    }

    static get UID() {
        return this.#UID;
    }

    static get SEARCH_QUERY() {
        return this.#SEARCH_QUERY;
    }

    static get SEARCH_PAGE() {
        return this.#SEARCH_PAGE;
    }
}

module.exports = WebVariables;