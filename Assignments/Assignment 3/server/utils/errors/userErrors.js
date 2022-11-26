class UserBadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

class UndefinedRequiredParameters extends UserBadRequest {};

class UserNotFound extends UserBadRequest {};

class UserNotOnline extends UserBadRequest {}

class IncorrectPassword extends UserBadRequest{};

class UserAlreadyExists extends UserBadRequest {};

class InvalidToken extends UserBadRequest{};

class FailedToCreateToken extends UserBadRequest{};

class FailedToAuthenticateRefreshToken extends UserBadRequest{
    constructor(message) {
        super(message)
        this.statusCode = 403;
    };
};

class FailedToFindRefreshToken extends UserBadRequest{
    constructor(message) {
        super(message)
        this.statusCode = 401;
    };
};

class FailedToUpdateToken extends UserBadRequest{};

module.exports = {
    UndefinedRequiredParameters,
    UserNotFound,
    UserNotOnline,
    IncorrectPassword,
    UserAlreadyExists,
    InvalidToken,
    FailedToCreateToken,
    FailedToAuthenticateRefreshToken,
    FailedToFindRefreshToken,
    FailedToUpdateToken,
}