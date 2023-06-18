class SessionUtility {
    static getSessionStorage() {
        if (typeof sessionStorage !== "undefined") {
            return sessionStorage;
        }
        else {
            return {
                hasOwnProperty: () => false,
                getItem: () => "undefined"
            }
        }
    }
}

module.exports = SessionUtility;