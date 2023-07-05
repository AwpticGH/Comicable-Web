class Routes {
    static #HOME = "/";
    static #ABOUT = "/about-us";
    static #TERMS_OF_SERVICE = "/terms-of-service";
    static #CUSTOMER_SUPPORT = "/customer-support";
    static #LOGIN = "/auth/login";
    static #REGISTER_1 = "/auth/register-email";
    static #REGISTER_2 = "/auth/register-password";
    static #LOGOUT = "/auth/logout";
    static #COLLECTION = "/collection:user_id";
    static #COLLECTION_DUMMY = "/collection";
    static #PROJECT = "/project"
    static #PROJECT_WITH_PAGE = "/project/page/:page";
    static #SEARCH = "/search"
    static #SERIES = "/series/:series";
    static #SERIES_DUMMY = "/series/detail";
    static #CHAPTER = "/series/:series/:chapter";
    static #CHAPTER_DUMMY = "/series/chapter/dummy";

    static get HOME() {
        return this.#HOME;
    }

    static get ABOUT() {
        return this.#ABOUT;
    }

    static get TERMS_OF_SERVICE() {
        return this.#TERMS_OF_SERVICE;
    }

    static get CUSTOMER_SUPPORT() {
        return this.#CUSTOMER_SUPPORT;
    }

    static get LOGIN() {
        return this.#LOGIN;
    }

    static get REGISTER_1() {
        return this.#REGISTER_1;
    }

    static get REGISTER_2() {
        return this.#REGISTER_2;
    }

    static get LOGOUT() {
        return this.#LOGOUT;
    }

    static get COLLECTION() {
        return this.#COLLECTION;
    }

    static get COLLECTION_DUMMY() {
        return this.#COLLECTION_DUMMY;
    }

    static get PROJECT() {
        return this.#PROJECT;
    }

    static get PROJECT_WITH_PAGE() {
        return this.#PROJECT_WITH_PAGE;
    }

    static get SEARCH() {
        return this.#SEARCH;
    }

    static get SERIES() {
        return this.#SERIES;
    }

    static get SERIES_DUMMY() {
        return this.#SERIES_DUMMY;
    }

    static get CHAPTER() {
        return this.#CHAPTER;
    }

    static get CHAPTER_DUMMY() {
        return this.#CHAPTER_DUMMY;
    }
}

module.exports = Routes;