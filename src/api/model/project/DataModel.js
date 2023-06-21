const BaseModel = require("../BaseModel");

class DataModel extends BaseModel {
    #projects;
    #pagination;

    get projects() {
        return this.#projects;
    }

    set projects(value) {
        this.#projects = value;
    }

    get pagination() {
        return this.#pagination;
    }

    set pagination(value) {
        this.#pagination = value;
    }

    toJSON() {
        return {
            projects: this.projects,
            pagination: this.pagination
        }
    }
}

module.exports = DataModel;