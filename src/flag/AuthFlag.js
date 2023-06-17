const SessionVariables = require("/src/dictionary/web/SessionVariables");

class AuthFlag {
    static isAuthenticated() {
        return sessionStorage.hasOwnProperty(SessionVariables.AUTH_MODEL);
    }
}

module.exports = AuthFlag;