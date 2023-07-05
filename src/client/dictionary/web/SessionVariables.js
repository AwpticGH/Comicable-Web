class SessionVariables {
    static #AUTH_MODEL = "AuthModel";
    static #UID = "UniqueID";

    static get AUTH_MODEL() {
        return this.#AUTH_MODEL;
    }

    static get UID() {
        return this.#UID;
    }
}

module.exports = SessionVariables;