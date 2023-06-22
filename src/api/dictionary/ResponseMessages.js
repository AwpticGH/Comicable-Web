class ResponseMessages {
    static #partial = "Data Has Been Partially Fetched";
    static #full = "Data Has Been Completely Fetched";
    static #fail = "Failed To Fetch Data";

    get PARTIAL() {
        return this.#partial;
    }

    get FULL() {
        return this.#full;
    }

    get FAIL() {
        return this.#fail;
    }
}

module.exports = ResponseMessages;