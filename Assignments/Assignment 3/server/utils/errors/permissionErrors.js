class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 401;
    }
}

class AuthenticationError extends PermissionError {}

class AdminPermissionsRequired extends PermissionError {}

class UserPermissionsRequired extends PermissionError {}

module.exports = {
    AuthenticationError,
    AdminPermissionsRequired,
    UserPermissionsRequired
}