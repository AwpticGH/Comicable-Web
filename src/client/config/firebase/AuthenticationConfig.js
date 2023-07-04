const { getAuth} = require("firebase/auth");

class AuthenticationConfig {

    static getAuthentication() {
        return getAuth();
    }

    static getCurrentUser() {
        return this.getAuthentication().currentUser;
    }
}

module.exports = AuthenticationConfig;