class ExternalUrl {
    static #URL = "https://shinigami.id/";

    static get URL() {
        return this.#URL;
    }
}

module.exports = ExternalUrl;