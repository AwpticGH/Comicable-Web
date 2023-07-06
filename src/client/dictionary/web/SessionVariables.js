class SessionVariables {
    static #ALERT = "MyAlert";
    static #AUTH_MODEL = "AuthModel";
    static #UID = "UniqueID";
    static #INPUT_EMAIL = "InputEmail";
    static #INPUT_FIRST_NAME = "InputFirstName";
    static #INPUT_LAST_NAME = "InputLastName";

    static get ALERT() {
        return this.#ALERT;
    }

    static get AUTH_MODEL() {
        return this.#AUTH_MODEL;
    }

    static get UID() {
        return this.#UID;
    }

    static get INPUT_EMAIL() {
        return this.#INPUT_EMAIL;
    }

    static get INPUT_FIRST_NAME() {
        return this.#INPUT_FIRST_NAME;
    }

    static get INPUT_LAST_NAME() {
        return this.#INPUT_LAST_NAME;
    }
}

module.exports = SessionVariables;