const BaseModel = require("./BaseModel");
const {add} = require("nodemon/lib/rules");

class AuthModel extends BaseModel {
    #address;
    #date_of_birth
    #email;
    #name;
    #password;
    #phone_number;
    #verified;

    constructor() {
        super();
    }

    constructor(address, date_of_birth, email, name, password, phone_number) {
        super();
        this.#address = address;
        this.#date_of_birth = date_of_birth
        this.#email = email;
        this.#name = name;
        this.#password = password;
        this.#phone_number = phone_number;
    }

    get getAddress() {
        return this.#address;
    }

    set setAddress(address) {
        this.#address = address;
    }

    get getDatOfBirth() {
        return this.#date_of_birth;
    }

    set setDateOfBirth(date_of_birth) {
        this.#date_of_birth = date_of_birth;
    }

    get getEmail() {
        return this.#email;
    }

    set setEmail(email) {
        this.#email = email;
    }

    get getName() {
        return this.#name;
    }

    set setName(name) {
        this.#name = name;
    }

    get getPassword() {
        return this.#password;
    }

    set setPassword(password) {
        this.#password = password;
    }

    get getPhoneNumber() {
        return this.#phone_number;
    }

    set setPhoneNumber(phone_number) {
        this.#phone_number = phone_number;
    }

    get isVerified() {
        return this.#verified === "1";
    }

    set setVerified(verified) {
        this.#verified = verified;
    }
}

module.exports = AuthModel;