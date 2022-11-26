const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const { InvalidToken } = require("../utils/errors/userErrors");

const userAuth = (req, res, next) => {
    const token = req.query.appid;
    if (!token)
        return next(new InvalidToken("Access denied, please check your 'appid' or view API docs for instructions."));
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        return next(new InvalidToken("Access denied, invalid token provided, please double check your token."));
    }
    userModel.findOne(
        { token: token },
        (err, doc) => {
            if (err)
                return next(new InvalidToken(err.message));
            else if (!doc)
                return next(new InvalidToken("Invalid token provided."))
            else if (!req.cookies.token)
                return next(new InvalidToken("Access denied, no token found. Please log in."))
            else if (req.cookies.token !== token)
                return next(new InvalidToken("Access denied, appid token does match user's token."))
            else
                next();
        });
}

module.exports = userAuth;
