const AuthFlag = require("./src/flag/AuthFlag");
const WebRoutes = require("./src/dictionary/web/Routes");
const WebVariables = require("./src/dictionary/web/WebVariables");
const SessionVariables = require("./src/dictionary/web/SessionVariables");
const Routes = require("./src/dictionary/web/Routes")
const FirebaseFlag = require("./src/flag/FirebaseFlag");
const FirebaseConfig = require("./src/config/FirebaseConfig");
const AuthModel = require("./src/model/AuthModel");
const CollectionModel = require("./src/model/CollectionModel");
const AuthController = require("./src/controller/AuthController");
const StringGenerator = require("./src/helper/generator/StringGenerator");
const UsersReference = require("./src/dictionary/database/reference/Users");
const CollectionController = require("./src/controller/CollectionController");

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

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
    response.locals.request = request;
    response.locals.AuthFlag = AuthFlag;
    response.locals.WebVariables = WebVariables;
    response.locals.SessionVariables = SessionVariables;
    response.locals.Routes = Routes;
    response.locals.UsersReference = UsersReference;
    next();
});

app.use(express.static(path.join(__dirname, "/web/public")));
app.use(express.urlencoded({ extended: false }));

app.get(WebRoutes.HOME, (request, response) => {
    response.render("index", {
        layout: "layout/main",
        css_file: AuthFlag.isAuthenticated(request.session) ? "home-masuk" : "home",
        page_title: "Home"
    });
});

app.get(WebRoutes.LOGIN, (request, response) => {
    response.render("auth/login", {
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Login"
    });
});

app.get(WebRoutes.REGISTER_1, (request, response) => {
    response.render("auth/register1", {
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Register Email"
    });
});

app.get(WebRoutes.REGISTER_2, (request, response) => {
    response.render("auth/register2", {
        layout: "layout/main",
        css_file: "masuk_daftar",
        page_title: "Register Password"
    });
});

app.get(WebRoutes.COLLECTION, (request, response) => {
    // let uid = request.params[WebVariables.UID];
    // let model = new CollectionModel();
    // model.setUid = uid;
});

app.get(WebRoutes.COLLECTION_DUMMY, (request, response) => {
    let uid = request.session[SessionVariables.AUTH_MODEL][SessionVariables.UID];
    let model = new CollectionModel();
    model.setUser = uid;

    let controller = new CollectionController();
    controller.read(request, response, model);

    // response.render("collection/comic_collection", {
    //     layout: "layout/main",
    //     css_file: "semua",
    //     page_title: "My Collection"
    // });
});

app.get(WebRoutes.COLLECTION_BOUGHT_DUMMY, (request, response) => {
    response.render("collection/comic_bought", {
        layout: "layout/main",
        css_file: "semua",
        page_title: "Owned Book"
    });
});

app.get(WebRoutes.COMIC_ALL, (request, response) => {
    response.render("comic/all", {
        layout: "layout.main",
        css_file: "semua",
        page_title: "All Comics"
    });
});

app.get(WebRoutes.COMIC_DETAIL_DUMMY, (request, response) => {
    response.render("comic/detail", {
        layout: "layout.main",
        css_file: "detail",
        page_title: "Comic Details"
    });
});

app.get(WebRoutes.COMIC_NEWEST, (request, response) => {
    response.render("comic/newest", {
        layout: "layout.main",
        css_file: "terbaru",
        page_title: "Newest Comics"
    });
});

app.get(WebRoutes.CHAPTER_DUMMY, (reuest, response) => {
    response.render("chapter/read", {
        layout: "layout.main",
        css_file: "view",
        page_title: "Chapter Read"
    });
});

app.get(WebRoutes.CUSTOMER_SUPPORT, (request, response) => {
    response.render("information/customer_support", {
        layout: "layout.main",
        css_file: "dukunganPelanggan",
        page_title: "Customer Support"
    });
});

app.get(WebRoutes.ABOUT, (request, response) => {
    response.render("information/about_us", {
        layout: "layout.main",
        css_file: "tentangKami",
        page_title: "About Us"
    });
});

app.get(WebRoutes.TERMS_OF_SERVICE, (request, response) => {
    response.render("information/terms_of_service", {
        layout: "layout.main",
        css_file: "ketentuanLayanan"
    });
});

app.post(WebRoutes.LOGIN, (request, response) => {
    let email = request.body[WebVariables.EMAIL];
    let password = request.body[WebVariables.PASSWORD];

    let model = new AuthModel();
    model.setEmail = email;
    model.setPassword = password;

    let controller = new AuthController();
    controller.read(request, response, model);
    console.log("Login : " + secretKey);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Started! Listening On Port ${PORT}`);
});

module.exports = app;