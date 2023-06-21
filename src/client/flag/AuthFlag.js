const BASE_PATH = require("../../../BasePath");
const SessionUtility = require(`${BASE_PATH}/src/client/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);
const UsersReference = require(`${BASE_PATH}/src/client/dictionary/database/reference/Users`);
const AuthModel = require(`${BASE_PATH}/src/client/model/AuthModel`);

class AuthFlag {
    static isAuthenticated(session) {
        return session[SessionVariables.AUTH_MODEL];
    }

    static isVerified(session) {
        return this.isAuthenticated(session) && session[SessionVariables.AUTH_MODEL][UsersReference.VERIFIED] === 1;
    }
}

module.exports = AuthFlag;