const BaseModel = require("./BaseModel");

class ComicsModel extends BaseModel {
    #author;
    #description;
    #image;
    #title;

    constructor() {
        super();
    }

    get getAuthor() {
        return this.#author;
    }

    set setAuthor(author) {
        this.#author = author;
    }

    get getDescription() {
        return this.#description;
    }

    set setDescription(description) {
        this.#description = description;
    }

    get getImage() {
        return this.#image;
    }

    set setImage(image) {
        this.#image = image;
    }

    get getTitle() {
        return this.#title;
    }

    set setTitle(title) {
        this.#title = title;
    }
}

module.exports = ComicsModel;