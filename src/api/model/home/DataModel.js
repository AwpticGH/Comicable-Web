const BaseModel = require("../BaseModel");

class DataModel {
    #trending;
    #latest;
    #mirror;

    get trending() {
        return this.#trending;
    }

    set trending(value) {
        this.#trending = value;
    }

    get latest() {
        return this.#latest;
    }

    set latest(value) {
        this.#latest = value;
    }

    get mirror() {
        return this.#mirror;
    }

    set mirror(value) {
        this.#mirror = value;
    }

    toJSON() {
        return {
            trending: this.trending,
            latest: this.latest,
            mirror: this.mirror
        }
    }
}

module.exports = DataModel;