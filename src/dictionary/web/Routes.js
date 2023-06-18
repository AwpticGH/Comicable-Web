class Routes {
    static HOME = "/";
    static ABOUT = "/about-us";
    static TERMS_OF_SERVICE = "/terms-of-service";
    static CUSTOMER_SUPPORT = "/customer-support";
    static LOGIN = "/auth/login";
    static REGISTER_1 = "/auth/register-email";
    static REGISTER_2 = "/auth/register-password";
    static LOGOUT = "/auth/logout";
    static COLLECTION = "/collection:user_id";
    static COLLECTION_DUMMY = "/collection";
    static COLLECTION_BOUGHT = "/collection/bought:user_id";
    static COLLECTION_BOUGHT_DUMMY = "/collection/bought";
    static COMIC_ALL = "/comic/all";
    static COMIC_NEWEST = "/comic/newest";
    static COMIC_DETAIL = "/comic/detail:comic_title";
    static COMIC_DETAIL_DUMMY = "/comic/detail";
    static CHAPTER = "/comic/:comic_title/:chapter";
    static CHAPTER_DUMMY = "/comic/chapter";
}

module.exports = Routes;