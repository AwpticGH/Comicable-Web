const BaseModel = require("./BaseModel");

class ComicsModel {
    author;
    description;
    image;
    title;
    constructor() {
        super();
    }

    constructor(author, description, image, title) {
        this.author = author;
        this.description = description;
        this.image = image;
        this.title = title;
    }

    get getAuthor() {
        return author;
    }

    get getDescription() {
        return description;
    }

    get getImage() {
        return image;
    }

    get getTitle() {
        return title;
    }
}

module.exports = ComicsModel;