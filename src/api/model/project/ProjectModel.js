const BaseModel = require("../BaseModel");

class ProjectModel extends BaseModel {
    #title;
    #type;
    #thumbnail;
    #series;
    #chapter;

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

    get series() {
        return this.#series;
    }

    set series(value) {
        this.#series = value;
    }

    get chapter() {
        return this.#chapter;
    }

    set chapter(value) {
        this.#chapter = value;
    }

    toJSON() {
        return {
            title: this.title,
            type: this.type,
            thumbnail: this.thumbnail,
            series: this.series,
            chapter: this.chapter
        }
    }
}

module.exports = ProjectModel;