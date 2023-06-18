const BaseModel = require("./BaseModel");

class UsersModel extends BaseModel {
    address;
    date_of_birth
    email;
    name;
    password;
    phone_number;

    constructur() {
        super();
    }

    consturctur(address, date_of_birth, email, name, password, phone_number) {
        this.address = address;
        this.date_of_birth = date_of_birth
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone_number = phone_number;
    }

    get getAddress() {
        return address;
    }

    get getDatOfBirth() {
        return date_of_birth;
    }

    get getEmail() {
        return email;
    }

    get getName() {
        return name;
    }

    get getPassword() {
        return password;
    }

    get getPhoneNumber() {
        return phone_number;
    }
}

module.exports = UsersModel;