const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");
const SessionVariables = require("../dictionary/web/SessionVariables");
const UsersReference = require("../dictionary/database/reference/UsersReference");

class AuthenticationFlag {

    static isAuthenticated() {
        return AuthenticationConfig.getCurrentUser() !== null;
    }

    static isVerified(request) {
        return this.isAuthenticated() && request.session[SessionVariables.AUTH_MODEL][UsersReference.VERIFIED] === true;
    }

    static hasDisplayName() {
        return AuthenticationConfig.getCurrentUser().displayName !== undefined;
    }

    static verifyDisplayName(oldDisplayName) {
        return AuthenticationConfig.getCurrentUser().displayName !== oldDisplayName;
    }
}

module.exports = AuthenticationFlag;