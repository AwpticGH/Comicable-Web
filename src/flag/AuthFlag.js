const BASE_PATH = require("../../BasePath")
const SessionUtility = require(`${BASE_PATH}/src/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/dictionary/web/SessionVariables`);

class AuthFlag {
    static isAuthenticated() {
        return SessionUtility.getSessionStorage().hasOwnProperty(SessionVariables.AUTH_MODEL);
    }
}

module.exports = AuthFlag;