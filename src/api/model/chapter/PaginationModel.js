const BaseModel = require("../BaseModel");

class PaginationModel {
    #previous;
    #next;

    get previous() {
        return this.#previous;
    }

    set previous(value) {
        this.#previous = value;
    }

    get next() {
        return this.#next;
    }

    set next(value) {
        this.#next = value;
    }

    toJSON() {
        return {
            previous: this.previous,
            next: this.next
        }
    }
}

module.exports = PaginationModel;