const BASE_PATH = require("../../../BasePath");
const FirebaseConfig = require(`${BASE_PATH}/src/client/config/firebase/FirebaseConfig`);


class FirebaseFlag {
    static isInitialized() {
        return FirebaseConfig.getFirebase().getApps().length > 0;
    }
}

module.exports = FirebaseFlag;