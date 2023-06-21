const BaseModel = require("../BaseModel");

class HomeModel extends BaseModel {
    #title;
    #type;
    #thumbnail;
    #endpoint;

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get thumbnail() {
        return this.#thumbnail;
    }

    set thumbnail(value) {
        this.#thumbnail = value;
    }

    get endpoint() {
        return this.#endpoint;
    }

    set endpoint(value) {
        this.#endpoint = value;
    }

    toJSON() {
        return {
            title: this.title,
            type: this.type,
            thumbnail: this.thumbnail,
            endpoint: this.endpoint
        }
    }
}

module.exports = HomeModel;