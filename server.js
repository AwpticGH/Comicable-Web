const WebRoute = require("./src/dictionary/WebRoute");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(path.join(__dirname, "/web"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
})

const app = express();
app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/web/public")));

app.get(WebRoute.HOME, (request, response) => {
    response.sendFile(path.join(__dirname, "/web/views/index.html"));
});
app.get(WebRoute.ABOUT, (request, response) => {
    response.sendFile(path.join(__dirname, "/web/views/information/dukunganPelanggan.html"));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;