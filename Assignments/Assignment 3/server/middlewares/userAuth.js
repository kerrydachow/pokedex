const jwt = require("jsonwebtoken");

const { InvalidToken } = require("../utils/errors/tokenErrors");

const userAuth = (req, res, next) => {
    const token = req.header('auth-token-access');
    if (!token)
        return next(new InvalidToken("Access denied: no token found in header."));
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        return next(new InvalidToken(err.message));
    }
    next();
}

module.exports = userAuth;
