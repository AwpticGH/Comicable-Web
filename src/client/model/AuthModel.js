const BaseModel = require("./BaseModel");

class AuthModel extends BaseModel {
    #email;
    #password;
    #first_name;
    #last_name;
    #verified;

    constructor() {
        super();
    }

    get getEmail() {
        return this.#email;
    }

    set setEmail(email) {
        this.#email = email;
    }

    get getPassword() {
        return this.#password;
    }

    set setPassword(password) {
        this.#password = password;
    }

    get first_name() {
        return this.#first_name;
    }

    set first_name(value) {
        this.#first_name = value;
    }

    get last_name() {
        return this.#last_name;
    }

    set last_name(value) {
        this.#last_name = value;
    }

    get isVerified() {
        return this.#verified === "1";
    }

    set setVerified(verified) {
        this.#verified = verified;
    }

    toString() {
        return `Email : ${this.#email},\nFirst Name : ${this.#first_name},\nLast Name : ${this.#last_name},\nVerified : ${this.#verified}`;
    }
}

module.exports = AuthModel;