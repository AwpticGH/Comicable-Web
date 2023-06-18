import initializeApp from "firebase/app";
const BASE_PATH = require("../../BasePath");
const FirebaseFlag = require(`${BASE_PATH}/src/flag/FirebaseFlag`);

class FirebaseConfig {
    #firebaseConfig = {
        apiKey: "AIzaSyAEtfkCxN52iRwCV2k6xFeX2FgBZUhqfZ0",
        authDomain: "comicable-bba44.firebaseapp.com",
        databaseURL: "https://comicable-bba44-default-rtdb.firebaseio.com",
        projectId: "comicable-bba44",
        storageBucket: "comicable-bba44.appspot.com",
        messagingSenderId: "790808144821",
        appId: "1:790808144821:web:d542e8b9db1aca22d687fc",
        measurementId: "G-YV818P6N0E"
    };

    static init() {
        // Initialize Firebase
        if (!FirebaseFlag.isInitialized()) {
            initializeApp(this.#firebaseConfig);
        }
    }
}