class Checkpoints {
    static #USER = "user";
    static #COMIC = "comic";
    static #CHAPTER = "chapter";

    static get USER() {
        return this.#USER;
    }

    static get COMIC() {
        return this.#COMIC;
    }

    static get CHAPTER() {
        return this.#CHAPTER;
    }
}

module.exports = Checkpoints;