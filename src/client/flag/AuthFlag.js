const BASE_PATH = require("../../../BasePath");
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);
const UsersReference = require(`${BASE_PATH}/src/client/dictionary/database/reference/Users`);

class AuthFlag {
    static isAuthenticated(session) {
        return session[SessionVariables.AUTH_MODEL];
    }

    static isVerified(session) {
        return this.isAuthenticated(session) && session[SessionVariables.AUTH_MODEL][UsersReference.VERIFIED] === 1;
    }
}

module.exports = AuthFlag;