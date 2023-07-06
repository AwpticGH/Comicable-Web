class Routes {
    // Landing Page
    static #HOME = "/";

    // Auth
    static #LOGIN = "/auth/login";
    static #REGISTER_1 = "/auth/register-email";
    static #REGISTER_2 = "/auth/register-password";
    static #LOGOUT = "/auth/logout";
    static #UPDATE_AUTH = "/auth/update"

    // Comic API
    static #COLLECTION = "/collection";
    static #COLLECTION_DUMMY = "/collection/dummy";
    static #PROJECT = "/project"
    static #PROJECT_WITH_PAGE = "/project/page/:page";
    static #SEARCH = "/search"
    static #SERIES = "/series/:series";
    static #SERIES_DUMMY = "/series/detail";
    static #CHAPTER = "/series/:series/:chapter";
    static #CHAPTER_DUMMY = "/series/chapter/dummy";

    // Comic CRUD
    static #COLLECTION_CREATE = "/collection/create";
    static #COLLECTION_DELETE = "/collection/delete";
    static #CHECKPOINT_CREATE = "/checkpoint/create";
    static #CHECKPOINT_UPDATE = "/checkpoint/update";
    static #CHECKPOINT_DELETE = "/checkpoint/delete";

    // Misc
    static #ABOUT = "/about-us";
    static #TERMS_OF_SERVICE = "/terms-of-service";
    static #CUSTOMER_SUPPORT = "/customer-support";

    static get HOME() {
        return this.#HOME;
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

    static get UPDATE_AUTH() {
        return this.#UPDATE_AUTH;
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

    static get COLLECTION_CREATE() {
        return this.#COLLECTION_CREATE;
    }

    static get COLLECTION_DELETE() {
        return this.#COLLECTION_DELETE;
    }

    static get CHECKPOINT_CREATE() {
        return this.#CHECKPOINT_CREATE;
    }

    static get CHECKPOINT_UPDATE() {
        return this.#CHECKPOINT_UPDATE;
    }

    static get CHECKPOINT_DELETE() {
        return this.#CHECKPOINT_DELETE;
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
}

module.exports = Routes;