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
const { request } = require("express");

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
    response.render("comic_collection", {
        AuthFlag,
        WebVariables,
        SessionVariables,
        Routes,
        layout: "layout/main",
        css_file: "semua",
        page_title: "My Collection"
    });
});
// test

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;