const BaseModel = require("../BaseModel");

class SearchModel extends BaseModel {
    #title;
    #status;
    #release;
    #rating;
    #thumbnail;
    #genres;
    #endpoint;

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get release() {
        return this.#release;
    }

    set release(value) {
        this.#release = value;
    }

    get rating() {
        return this.#rating;
    }

    set rating(value) {
        this.#rating = value;
    }

    get thumbnail() {
        return this.#thumbnail;
    }

    set thumbnail(value) {
        this.#thumbnail = value;
    }

    get genres() {
        return this.#genres;
    }

    set genres(value) {
        this.#genres = value;
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
            status: this.status,
            release: this.release,
            rating: this.rating,
            thumbnail: this.thumbnail,
            genres: this.genres,
            endpoint: this.endpoint
        }
    }
}

module.exports = SearchModel;