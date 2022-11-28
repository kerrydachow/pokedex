const { AdminPermissionsRequired, AuthenticationError } = require("../utils/errors/permissionErrors");
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    jwt.verify(req.header('auth-token-access'), process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(new AuthenticationError(err.message));
        if (user.userType != "admin") return next(new AdminPermissionsRequired("Access denied, admin permissions required."));
        return next();
    })
}

module.exports = adminAuth;
