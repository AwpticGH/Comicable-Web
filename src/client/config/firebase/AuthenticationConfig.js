const {
    getAuth
} = require("firebase/auth");
const FirebaseConfig = require("../firebase/FirebaseConfig");

class AuthenticationConfig {

    static getAuthentication() {
        return getAuth(FirebaseConfig.getFirebase().getApp());
    }

    static getCurrentUser() {
        return this.getAuthentication().currentUser;
    }

    static hasDisplayName() {
        return this.getCurrentUser().displayName !== undefined;
    }
}

module.exports = AuthenticationConfig;