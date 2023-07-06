// Client
const StringGenerator = require("./src/client/helper/generator/StringGenerator");
// Router
const ComicRouter = require("./src/client/router/ComicRouter");
const AuthenticationRouter = require("./src/client/router/AuthenticationRouter");
const MiscRouter = require("./src/client/router/MiscRouter");
// Middleware
const WebMiddleware = require("./src/client/middleware/WebMiddleware");

// Api
const ApiRouter = require("./src/api/router/ApiRouter");
const cors = require("cors");

// Third-Party
const express = require("express");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");


const app = express();
app.set("views", "./web/views");
app.set("view engine", "ejs");
app.set("trust proxy", true);
app.use(ejsLayouts);

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
    console.log("Env : " + process.env.NODE_ENV);
    const morgan = require("morgan");
    const liveReload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(path.join(__dirname, "/web"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    })
    app.use(connectLiveReload());
}

const secretKey = StringGenerator.generateSecretKey();
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false
    })
);

app.use(express.urlencoded({ extended: false }));
// Api 3rd Party
app.use(cors());
// Api
app.use(ApiRouter);

app.use(WebMiddleware);
app.use(AuthenticationRouter);
app.use(ComicRouter);
app.use(MiscRouter);

app.use(express.static(path.join(__dirname, "/web/public")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;