class SessionUtility {
    static getSessionStorage() {
        if (typeof sessionStorage !== "undefined") {
            return sessionStorage;
        }
        else {
            return {
                hasOwnProperty: () => false,
                getItem: (key) => "undefined"
            }
        }
    }
}

module.exports = SessionUtility;