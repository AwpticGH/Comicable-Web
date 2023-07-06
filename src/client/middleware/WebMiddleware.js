const Routes = require("../dictionary/web/Routes");

const AuthenticationFlag = require("../flag/AuthenticationFlag");
const FirebaseFlag = require("../flag/FirebaseFlag");

const express = require("express");
const FirebaseConfig = require("../config/firebase/FirebaseConfig");
const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");
const WebVariables = require("../dictionary/web/WebVariables");
const SessionVariables = require("../dictionary/web/SessionVariables");

const router = express.Router();

router.use((request, response, next) => {
    if (!FirebaseFlag.isInitialized()) {
        FirebaseConfig.init();
        console.log("Firebase Initialized");
    }
    if (AuthenticationFlag.isAuthenticated()) {
        response.locals.AuthenticationConfig = AuthenticationConfig;
    }
    response.locals.request = request;
    response.locals.AuthenticationFlag = AuthenticationFlag;
    response.locals.WebVariables = WebVariables;
    response.locals.SessionVariables = SessionVariables;
    response.locals.Routes = Routes;
    next();
});

router.get(Routes.COLLECTION, (request, response, next) => {
    if (AuthenticationFlag.isAuthenticated()) {
        next();
    } else {
        response.redirect(Routes.LOGIN);
    }
});

module.exports = router;