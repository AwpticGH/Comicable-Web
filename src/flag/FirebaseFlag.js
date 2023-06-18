class FirebaseFlag {
    static isInitialized() {
        return firebase.apps.length === 0;
    }
}

module.exports = FirebaseFlag;