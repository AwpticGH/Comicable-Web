const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword ,
    updateProfile,
    signOut
} = require("firebase/auth");
const AuthenticationConfig = require("../../config/firebase/AuthenticationConfig");

class AuthenticationController {

    async login(email, password) {
        return await signInWithEmailAndPassword(AuthenticationConfig.getAuthentication(), email, password);
    }

    async register(email, password) {
        return await createUserWithEmailAndPassword(AuthenticationConfig.getAuthentication(), email, password);
    }

    async updateProfile(displayName, photoUrl) {
        let value = {
            displayName: displayName,
            photoURL: photoUrl
        }
        return await updateProfile(AuthenticationConfig.getCurrentUser(), value);
    }

    async logout() {
        return signOut(AuthenticationConfig.getAuthentication());
    }
}

module.exports = AuthenticationController;