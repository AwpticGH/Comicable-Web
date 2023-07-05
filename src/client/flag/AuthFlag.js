const BASE_PATH = require("../../../BasePath");
const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);
const UsersReference = require(`${BASE_PATH}/src/client/dictionary/database/reference/Users`);

class AuthFlag {

    static isAuthenticated() {
        return AuthenticationConfig.getCurrentUser() !== null;
    }

    static isVerified(request) {
        return this.isAuthenticated() && request.session[SessionVariables.AUTH_MODEL][UsersReference.VERIFIED] === true;
    }
}

module.exports = AuthFlag;