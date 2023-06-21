const BaseModel = require("../BaseModel");

class DataModel {
    #title;
    #images;
    #pagination;

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get images() {
        return this.#images;
    }

    set images(value) {
        this.#images = value;
    }

    get pagination() {
        return this.#pagination;
    }

    set pagination(value) {
        this.#pagination = value;
    }

    toJSON() {
        return {
            title: this.title,
            images: this.images,
            pagination: this.#pagination
        }
    }
}

module.exports = DataModel;