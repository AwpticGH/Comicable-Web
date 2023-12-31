const crypto = require("crypto");

class StringGenerator {
    static generateSecretKey() {
        return crypto.randomBytes(32).toString("hex");
    }
}

module.exports = StringGenerator;