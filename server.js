const WebRoutes = require("./src/dictionary/web/Routes");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");
const ejsLayouts = require("express-ejs-layouts");

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(path.join(__dirname, "/web"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
})

const app = express();
app.set("views", "./web/views");
app.set("view engine", "ejs");
app.use(ejsLayouts);

app.use(connectLiveReload());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "/web/public")));
app.use(express.urlencoded({ extended: false }));

const AuthFlag = require("./src/flag/AuthFlag");
const WebVariables = require("./src/dictionary/web/WebVariables");
const SessionVariables = require("./src/dictionary/web/SessionVariables");
const Routes = require("./src/dictionary/web/Routes");

app.get(WebRoutes.HOME, (request, response) => {
    response.render("index", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: AuthFlag.isAuthenticated() ? "home-masuk" : "home",
        page_title: "Home"
    })
});

app.get(WebRoutes.LOGIN, (request, response) => {
    response.render("auth/login", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Login"
    });
});

app.get(WebRoutes.REGISTER_1, (request, response) => {
    response.render("auth/register1", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Register Email"
    });
});

app.get(WebRoutes.REGISTER_2, (request, response) => {
    response.render("auth/register2", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Register Password"
    });
});

app.get(WebRoutes.COLLECTION_DUMMY, (request, response) => {
    response.render("collection/comic_collection", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "semua",
        page_title: "My Collection"
    });
});

app.get(WebRoutes.COLLECTION_BOUGHT_DUMMY, (request, response) => {
    response.render("collection/comic_bought", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "semua",
        page_title: "Owned Book"
    });
});

app.get(WebRoutes.COMIC_ALL, (request, response) => {
    response.render("comic/all", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "semua",
        page_title: "All Comics"
    });
});

app.get(WebRoutes.COMIC_DETAIL_DUMMY, (request, response) => {
    response.render("comic/detail", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "detail",
        page_title: "Comic Details"
    });
});

app.get(WebRoutes.COMIC_NEWEST, (request, response) => {
    response.render("comic/newest", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "terbaru",
        page_title: "Newest Comics"
    });
});

app.get(WebRoutes.CHAPTER_DUMMY, (reuest, response) => {
    response.render("chapter/read", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "view",
        page_title: "Chapter Read"
    });
});

app.get(WebRoutes.CUSTOMER_SUPPORT, (request, response) => {
    response.render("information/customer_support", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "dukunganPelanggan",
        page_title: "Customer Support"
    });
});

app.get(WebRoutes.ABOUT, (request, response) => {
    response.render("information/about_us", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "tentangKami",
        page_title: "About Us"
    });
});

app.get(WebRoutes.TERMS_OF_SERVICE, (request, response) => {
    response.render("information/terms_of_service", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout.main",
        css_file: "ketentuanLayanan"
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;