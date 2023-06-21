class Routes {
    static #BASE = "/api";
    static #HOME = `${this.#BASE}/home`;
    static #SERIES = `${this.#BASE}/series/:series`;
    static #CHAPTER = `${this.#BASE}/series/:series/:chapter`;
    static #PROJECT = `${this.#BASE}/project/page/:page`;
    static #SEARCH = `${this.#BASE}/search/:query`;
    static #SEARCH_WITH_PAGE = `${this.#BASE}/search/:query/page/:page?`;

    static get BASE() {
        return this.#BASE;
    }

    static get HOME() {
        return this.#HOME;
    }

    static get SERIES() {
        return this.#SERIES;
    }

    static get CHAPTER() {
        return this.#CHAPTER;
    }

    static get PROJECT() {
        return this.#PROJECT;
    }

    static get SEARCH() {
        return this.#SEARCH;
    }

    static get SEARCH_WITH_PAGE() {
        return this.#SEARCH_WITH_PAGE;
    }
}

module.exports = Routes;