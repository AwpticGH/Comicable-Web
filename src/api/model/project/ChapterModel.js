const BaseModel = require("../BaseModel");

class ChapterModel extends BaseModel {
    #name;
    #endpoint;

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get endpoint() {
        return this.#endpoint;
    }

    set endpoint(value) {
        this.#endpoint = value;
    }

    toJSON() {
        return {
            name: this.name,
            endpoint: this.endpoint
        }
    }
}

module.exports = ChapterModel;