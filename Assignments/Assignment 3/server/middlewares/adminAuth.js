const userModel = require("../models/userModel");
const { AdminPermissionsRequired, AuthenticationError } = require("../utils/errors/permissionErrors");

const adminAuth = (req, res, next) => {
    userModel.findOne(
        { token: req.query.appid },
        (err, doc) => {
            console.log(doc);
            if (err)
                return next(new AuthenticationError(err.message));
            else if (!doc)
                return next(new AuthenticationError("Access denied, token has expired, please log in again."));
            else if (doc.userType !== "admin")
                return next(new AdminPermissionsRequired("Access denied, admin permissions required."));
            else
                next();
        })
}

module.exports = adminAuth;
