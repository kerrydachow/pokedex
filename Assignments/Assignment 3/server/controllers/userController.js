const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../models/userModel");
const refreshTokenModel = require("../models/refreshTokenModel")
const asyncWrapper = require("../utils/asyncWrapper");
const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = require('../utils/constants');
const { UndefinedRequiredParameters, UserNotFound, IncorrectPassword, UserAlreadyExists, FailedToCreateUser } = require("../utils/errors/userErrors");
const { FailedToUpdateToken, FailedToCreateToken } = require("../utils/errors/tokenErrors");

const registerUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (await userModel.findOne({ email }))
        return next(new UserAlreadyExists("Email already exists in database."));
    switch (true) {
        case !password:
            return next(new UndefinedRequiredParameters("Password is undefined."));
        case !email:
            return next(new UndefinedRequiredParameters("Email is undefined."));
        default:
            break;
    }
    const hashedPassword = await hashPassword(password);
    userModel.create({ email: email, password: hashedPassword },
        (err, doc) => {
            if (err) return next(new FailedToCreateUser(err.message));
            const accessToken = jwt.sign({ _id: doc._id, userType: doc.userType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_MAX_AGE })
            const refreshToken = jwt.sign({ _id: doc._id, userType: doc.userType }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_MAX_AGE });
            refreshTokenModel.create({ refreshToken: refreshToken }, 
                (err, doc) => {
                    if (err) return next(new FailedToCreateToken(err.message));
                    res.header('auth-token-access', accessToken);
                    res.header('auth-token-refresh', refreshToken);
                    res.send("Successfully registered user.");
            })
        } );
});

const loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
        return next(new UserNotFound("User not found."));
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
        return next(new IncorrectPassword("Password is incorrect."));
    const accessToken = jwt.sign({ _id: user._id, userType: user.userType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_MAX_AGE })
    const refreshToken = jwt.sign({ _id: user._id, userType: user.userType }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_MAX_AGE });
    refreshTokenModel.create({ refreshToken: refreshToken }, 
        (err, doc) => {
            if (err) return next(new FailedToCreateToken(err.message));
            res.header('auth-token-access', accessToken);
            res.header('auth-token-refresh', refreshToken);
            res.send("Login is successful.");
    })
    // userModel.findOne(
    //     { username: username },
    //     (err, doc) => {
    //         if (err)
    //             return next(new FailedToUpdateToken(err.message));
    //         res.cookie('token', doc.token, { maxAge: TOKEN_MAX_AGE, httpOnly: true })
    //         res.json(
    //             { Message: "Successfully logged in user.", 
    //                 "API Instructions" : {
    //                     Token: doc.token, 
    //                     Instructions: "Add token as \"appid\" req.param. e.g. localhost:4000/pokemon/10?appid=<token>"
    //                 }
    //             }
    //         );
    //     })
})

const logoutUser = asyncWrapper(async (req, res, next) => {
    refreshTokenModel.deleteOne({ refreshToken: req.body.token }, 
        (err, doc) => {
            if (err) return next(new FailedToUpdateToken(err));
            res.send("Logout is successful.");
    })
})

const hashPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}
