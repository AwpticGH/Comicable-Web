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

app.get(WebRoutes.HOME, (request, response) => {
    // response.sendFile(path.join(__dirname, "/web/views/index-original.html"));
    let AuthFlag = require("./src/flag/AuthFlag");
    let WebVariables = require("./src/dictionary/web/WebVariables");
    let SessionVariables = require("./src/dictionary/web/SessionVariables");
    let Routes = require("./src/dictionary/web/Routes");
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
app.get(WebRoutes.ABOUT, (request, response) => {
    response.sendFile(path.join(__dirname, "/web/views/information/dukunganPelanggan.html"));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;