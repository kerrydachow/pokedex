const jwt = require('jsonwebtoken');

const refreshTokenModel = require("../models/refreshTokenModel")
const asyncWrapper = require("../utils/asyncWrapper");

const checkIfAccessTokenExpired = asyncWrapper(async (req, res, next) => {
    const accessToken = req.body.token;
    if (!accessToken) res.send(false);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.send(true)
        res.send(false)
    })
    
})

const createNewAccessToken = asyncWrapper(async (req, res, next) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return next(new FailedToFindRefreshToken("Refresh token supplied was null."))
    refreshTokenModel.findOne({ refreshToken: refreshToken }, 
        (err, doc) => {
            if (err) return next(new FailedToAuthenticateRefreshToken(err.message));
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return next(new FailedToAuthenticateRefreshToken(err.message));
                const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
                res.json({ accessToken: accessToken})
            })
        })
})

module.exports = {
    checkIfAccessTokenExpired,
    createNewAccessToken,
}