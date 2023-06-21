const BaseModel = require("../BaseModel");

class DataModel extends BaseModel {
    #searches;
    #pagination;

    get searches() {
        return this.#searches;
    }

    set searches(value) {
        this.#searches = value;
    }

    get pagination() {
        return this.#pagination;
    }

    set pagination(value) {
        this.#pagination = value;
    }

    toJSON() {
        return {
            searches: this.searches,
            pagination: this.pagination
        }
    }
}

module.exports = DataModel;