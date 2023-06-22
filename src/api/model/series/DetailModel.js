const BaseModel = require("../BaseModel");

class DetailModel {
    #title;
    #alternative;
    #rank;
    #rating;
    #author;
    #artist;
    #genres;
    #release;
    #status;
    #thumbnail;
    #synopsis;

    get thumbnail() {
        return this.#thumbnail;
    }

    set thumbnail(value) {
        this.#thumbnail = value;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get alternative() {
        return this.#alternative;
    }

    set alternative(value) {
        this.#alternative = value;
    }

    get rank() {
        return this.#rank;
    }

    set rank(value) {
        this.#rank = value;
    }

    get rating() {
        return this.#rating;
    }

    set rating(value) {
        this.#rating = value;
    }

    get author() {
        return this.#author;
    }

    set author(value) {
        this.#author = value;
    }

    get artist() {
        return this.#artist;
    }

    set artist(value) {
        this.#artist = value;
    }

    get genres() {
        return this.#genres;
    }

    set genres(value) {
        this.#genres = value;
    }

    get release() {
        return this.#release;
    }

    set release(value) {
        this.#release = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get synopsis() {
        return this.#synopsis;
    }

    set synopsis(value) {
        this.#synopsis = value;
    }

    toJSON() {
        return {
            title: this.title,
            alternative: this.alternative,
            rank: this.rank,
            rating: this.rating,
            author: this.author,
            artist: this.artist,
            genres: this.genres,
            release: this.release,
            status: this.status,
            thumbnail: this.thumbnail,
            synopsis: this.synopsis
        }
    }
}

module.exports = DetailModel;
