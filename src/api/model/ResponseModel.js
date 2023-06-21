class ResponseModel {
    #status;
    #message;
    #data;

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get message() {
        return this.#message;
    }

    set message(value) {
        this.#message = value;
    }

    get data() {
        return this.#data;
    }

    set data(value) {
        this.#data = value;
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        }
    }
}

module.exports = ResponseModel;