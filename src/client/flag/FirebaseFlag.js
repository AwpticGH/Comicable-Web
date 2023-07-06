const FirebaseConfig = require("../config/firebase/FirebaseConfig");


class FirebaseFlag {
    static isInitialized() {
        return FirebaseConfig.getFirebase().getApps().length > 0;
    }
}

module.exports = FirebaseFlag;