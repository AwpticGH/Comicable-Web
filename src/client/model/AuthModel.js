const BaseModel = require("./BaseModel");

class AuthModel extends BaseModel {
    #uid;
    #email;
    #password;
    #first_name;
    #last_name;
    #verified;

    constructor() {
        super();
    }

    get uid() {
        return this.#uid;
    }

    set uid(value) {
        this.#uid = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        this.#password = value;
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

    get verified() {
        return this.#verified;
    }

    set verified(value) {
        this.#verified = value;
    }

    toString() {
        return `Email : ${this.#email},\nFirst Name : ${this.#first_name},\nLast Name : ${this.#last_name},\nVerified : ${this.#verified}`;
    }

    toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            password: this.password,
            first_name: this.first_name,
            last_name: this.last_name,
            verified: this.verified
        }
    }
}

module.exports = AuthModel;