export const userConstraints = {
    ABOUT_MAX_LENGTH: 512,
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MAX_LENGTH: 15,
    PASSWORD_PATTERN: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
};

export const roles = {
    USER: "ROLE_USER",
    ADMIN: "ROLE_ADMIN",
};

export const genders = {
    MALE: "MALE",
    FEMALE: "FEMALE",
};

export const accountStatuses = {
    ACTIVE: "ACTIVE",
    SUSPENDED: "SUSPENDED",
    DEACTIVATED: "DEACTIVATED",
};

export const userRegistrationStatistics = {
    registered: 0,
    active: 0,
    suspended: 0,
};

export const suspendAccount = () => {

};

export const activateAccount = () => {

};

export const deactivateAccount = () => {

};

export class User {
    constructor(other) {
        this._name = other.name;
        this._username = other.username;
        this._password = other.password;
        this._gender = other.gender;
        this._roles = other.roles;
        this._avatarPath = other.avatarPath;
        this._about = other.about;
        this._registrationDate = other.registrationDate;
        this._modificationDate = other.modificationDate;
        this._id = other.id;
    }

    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get username () {
        return this._username;
    }

    get password () {
        return this._password;
    }

    get gender () {
        return this._gender;
    }

    get roles () {
        return this._roles;
    }

    get avatarPath () {
        return this._avatarPath;
    }

    get about () {
        return this._about;
    }

    get registrationDate () {
        return this._registrationDate;
    }

    get modificationDate () {
        return this._modificationDate;
    }

    set id (id) {
        this._id = id;
    }

    set name (name) {
        this._name = name;
    }

    set username (username) {
        this._username = username;
    }

    set password (password) {
        this._password = password;
    }

    set gender (gender) {
        this._gender = gender;
    }

    set roles (roles) {
        this._roles = roles;
    }

    set avatarPath (avatarPath) {
        this._avatarPath = avatarPath;
    }

    set about (about) {
        this._about = about;
    }

    set registrationDate (registrationDate) {
        this._registrationDate = registrationDate;
    }

    set modificationDate (modificationDate) {
        this._modificationDate = modificationDate;
    }
}