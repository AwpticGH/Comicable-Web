const BaseModel = require("../BaseModel");

class DataModel extends BaseModel {
    #detail;
    #chapters;

    get detail() {
        return this.#detail;
    }

    set detail(value) {
        this.#detail = value;
    }

    get chapters() {
        return this.#chapters;
    }

    set chapters(value) {
        this.#chapters = value;
    }

    toJSON() {
        return {
            detail: this.detail,
            chapters: this.chapters
        }
    }
}

module.exports = DataModel;