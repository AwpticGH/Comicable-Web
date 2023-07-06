class WebVariables {
    static #EMAIL = "user-email";
    static #PASSWORD = "user-password";
    static #PASSWORD_CONFIRMATION = "user-password-confirmation";
    static #FIRST_NAME = "user-first-name";
    static #LAST_NAME = "user-last-name";
    static #IMAGE = "user-image";
    static #UID = "user-uid";
    static #SEARCH_QUERY = "query";
    static #SEARCH_PAGE ="page";

    // comic crud
    static _COLLECTION_UID = "collection-uid";
    static _COLLECTION_TITLE = "collection-title";
    static _COLLECTION_ENDPOINT = "collection-endpoint";

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

    static get IMAGE() {
        return this.#IMAGE;
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

    static get COLLECTION_UID() {
        return this._COLLECTION_UID;
    }

    static get COLLECTION_TITLE() {
        return this._COLLECTION_TITLE;
    }

    static get COLLECTION_ENDPOINT() {
        return this._COLLECTION_ENDPOINT;
    }
}

module.exports = WebVariables;