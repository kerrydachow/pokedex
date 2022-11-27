const jwt = require('jsonwebtoken');

const refreshTokenModel = require("../models/refreshTokenModel")
const asyncWrapper = require("../utils/asyncWrapper");
const { ACCESS_TOKEN_MAX_AGE } = require('../utils/constants');
const { FailedToFindRefreshToken, FailedToAuthenticateRefreshToken, InvalidToken } = require("../utils/errors/tokenErrors")

const checkIfAccessTokenExpired = asyncWrapper(async (req, res, next) => {
    const accessToken = req.body.token;
    console.log(accessToken);
    if (!accessToken) res.send(true);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.send(true)
        console.log(user);
        res.send(false)
    })
    
})

const createNewAccessToken = asyncWrapper(async (req, res, next) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return next(new FailedToFindRefreshToken("Refresh token supplied was null."))
    refreshTokenModel.findOne({ refreshToken: refreshToken }, 
        (err, doc) => {
            if (err) return next(new FailedToAuthenticateRefreshToken(err.message));
            if (!doc) return next(new FailedToAuthenticateRefreshToken("User has logged out and token is invalid."));
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return next(new FailedToAuthenticateRefreshToken(err.message));
                const accessToken = jwt.sign({_id: user._id, userType: user.userType}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_MAX_AGE })
                res.json({ accessToken: accessToken })
            })
        })
})

const removeRefreshToken = asyncWrapper(async (req, res, next) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return next(new FailedToFindRefreshToken("Refresh token supplied was null."))
    refreshTokenModel.deleteOne({ refreshToken: refreshToken }, 
        (err, doc) => {
            if (err) return next(new InvalidToken(err.message));
            if (!doc) return next(new FailedToFindRefreshToken("Refresh token supplied was not found."))
            res.send("Successfully delete token.");
        })
})

module.exports = {
    checkIfAccessTokenExpired,
    createNewAccessToken,
    removeRefreshToken,
}