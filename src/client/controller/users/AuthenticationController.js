const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword ,
    updateProfile,
    signOut,
    updatePassword
} = require("firebase/auth");
const AuthenticationConfig = require("../../config/firebase/AuthenticationConfig");
const AuthFlag = require("../../flag/AuthenticationFlag");

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
        let result = false;
        try {
            await updateProfile(AuthenticationConfig.getCurrentUser(), value)
                .then(() => {
                    result = AuthFlag.hasDisplayName();
                });
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async updatePassword(value) {
        let result = false;
        try {
            await updatePassword(AuthenticationConfig.getCurrentUser(), value)
                .then(() => {
                    result = true;
                });
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async logout() {
        return signOut(AuthenticationConfig.getAuthentication());
    }
}

module.exports = AuthenticationController;