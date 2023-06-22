class ResponseMessages {
    static #PARTIAL = "Data Has Been Partially Fetched";
    static #FULL = "Data Has Been Completely Fetched";
    static #FAIL = "Failed To Fetch Data";

    static get PARTIAL() {
        return this.#PARTIAL;
    }

    static get FULL() {
        return this.#FULL;
    }

    static get FAIL() {
        return this.#FAIL;
    }
}

module.exports = ResponseMessages;