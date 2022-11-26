const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../models/userModel");
const asyncWrapper = require("../utils/asyncWrapper");
const { TOKEN_MAX_AGE } = require('../utils/constants');
const { UndefinedRequiredParameters, UserNotFound, IncorrectPassword, UserAlreadyExists, UserFailsValidation, FailedToUpdateToken, UserNotOnline } = require("../utils/errors/userErrors");

const registerUser = asyncWrapper(async (req, res, next) => {
    const { username, password, email } = req.body;
    if (await userModel.findOne({username}))
        return next(new UserAlreadyExists("Username already exists in database."));
    switch (true) {
        case !username:
            return next(new UndefinedRequiredParameters("Username is undefined."));
        case !password:
            return next(new UndefinedRequiredParameters("Password is undefined."));
        case !email:
            return next(new UndefinedRequiredParameters("Email is undefined."));
        default:
            break;
    }
    const hashedPassword = await hashPassword(password);
    userModel.create({ username: username, password: hashedPassword, email: email },
        (err, doc) => {
            if (err)
                return next(new UserFailsValidation(err.message));
            const token = jwt.sign({_id: doc._id}, process.env.TOKEN_SECRET);
            userModel.findOneAndUpdate(
                { username: username },
                { token: token },
                (err) => {
                    if (err)
                        return next(new FailedToUpdateToken(err.message));
                    res.send("Successfully registered user.");
                }
            );
        } );
});

const loginUser = asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user)
        return next(new UserNotFound("User not found."));
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
        return next(new IncorrectPassword("Password is incorrect."));
    userModel.findOne(
        { username: username },
        (err, doc) => {
            if (err)
                return next(new FailedToUpdateToken(err.message));
            res.cookie('token', doc.token, { maxAge: TOKEN_MAX_AGE, httpOnly: true })
            res.json(
                { Message: "Successfully logged in user.", 
                    "API Instructions" : {
                        Token: doc.token, 
                        Instructions: "Add token as \"appid\" req.param. e.g. localhost:4000/pokemon/10?appid=<token>"
                    }
                }
            );
        })
})

const logoutUser = asyncWrapper(async (req, res, next) => {
    if (!req.cookies.token)
        return next(new UserNotOnline("You are not logged in."));
    res.clearCookie('token');
    res.json({ Message: `Successfully logged out user. See you soon ${req.body.username}!` });
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
