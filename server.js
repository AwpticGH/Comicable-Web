// Client
const AuthFlag = require("./src/client/flag/AuthFlag");
const WebRoutes = require("./src/client/dictionary/web/Routes");
const WebVariables = require("./src/client/dictionary/web/WebVariables");
const SessionVariables = require("./src/client/dictionary/web/SessionVariables");
const Routes = require("./src/client/dictionary/web/Routes")
const FirebaseFlag = require("./src/client/flag/FirebaseFlag");
const FirebaseConfig = require("./src/client/config/firebase/FirebaseConfig");
const AuthModel = require("./src/client/model/AuthModel");
const CollectionModel = require("./src/client/model/CollectionModel");
const AuthController = require("./src/client/controller/users/DatabaseController");
const StringGenerator = require("./src/client/helper/generator/StringGenerator");
const UsersReference = require("./src/client/dictionary/database/reference/Users");
const CollectionController = require("./src/client/controller/collections/CollectionController");
const AuthenticationFlag = require("./src/client/flag/AuthFlag");
const AuthenticationConfig = require("./src/client/config/firebase/AuthenticationConfig");
// Router
const ClientRouter = require("./src/client/router/ComicRouter");
const AuthenticationRouter = require("./src/client/router/AuthenticationRouter");
const MiscRouter = require("./src/client/router/MiscRouter");

// Api
const ApiRouter = require("./src/api/router/ApiRouter");
const cors = require("cors");

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
app.use((request, response, next) => {
    if (!FirebaseFlag.isInitialized()) {
        FirebaseConfig.init();
        console.log("Firebase Initialized");
    }
    if (AuthenticationFlag.isAuthenticated()) {
        response.locals.AuthenticationConfig = AuthenticationConfig;
    }
    response.locals.request = request;
    response.locals.AuthFlag = AuthFlag;
    response.locals.WebVariables = WebVariables;
    response.locals.SessionVariables = SessionVariables;
    response.locals.Routes = Routes;
    response.locals.UsersReference = UsersReference;
    next();
});

app.use(cors());
app.use(ApiRouter);
app.use(ClientRouter);
app.use(AuthenticationRouter);
app.use(MiscRouter);

app.use(express.static(path.join(__dirname, "/web/public")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;