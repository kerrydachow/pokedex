class TokenBadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

class InvalidToken extends TokenBadRequest{};

class FailedToUpdateToken extends TokenBadRequest{};

class FailedToCreateToken extends TokenBadRequest{};

class FailedToAuthenticateRefreshToken extends TokenBadRequest{
    constructor(message) {
        super(message)
        this.statusCode = 403;
    };
};

class FailedToFindRefreshToken extends TokenBadRequest{
    constructor(message) {
        super(message)
        this.statusCode = 401;
    };
};

module.exports = {
    InvalidToken,
    FailedToUpdateToken,
    FailedToCreateToken,
    FailedToAuthenticateRefreshToken,
    FailedToFindRefreshToken,
}