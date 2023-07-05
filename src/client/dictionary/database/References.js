class References {
    static #COLLECTION = "collections";
    static #AUTH = "users";
    static #CHECKPOINT = "checkpoints";

    static get COLLECTION() {
        return this.#COLLECTION;
    }

    static get AUTH() {
        return this.#AUTH;
    }

    static get CHECKPOINT() {
        return this.#CHECKPOINT;
    }
}

module.exports = References;