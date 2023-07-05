class RequestVariables {
    static #HOME_DATA = "HomeData";
    static #PROJECT_DATA = "ProjectData";
    static #SEARCH_DATA = "SearchData";
    static #SERIES_DATA = "SeriesData";
    static #CHAPTER_DATA = "ChapterData";

    static get HOME_DATA() {
        return this.#HOME_DATA;
    }

    static get PROJECT_DATA() {
        return this.#PROJECT_DATA;
    }

    static get SEARCH_DATA() {
        return this.#SEARCH_DATA;
    }

    static get SERIES_DATA() {
        return this.#SERIES_DATA;
    }

    static get CHAPTER_DATA() {
        return this.#CHAPTER_DATA;
    }
}

module.exports = RequestVariables;