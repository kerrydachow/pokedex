const jwt = require("jsonwebtoken");

const apiLogger = (req, res, next) => {
    const apiPathName = req._parsedUrl.pathname;
    const apiQuery = req._parsedUrl.query
    const apiPath = req._parsedUrl.path;
    const payload = req.headers['auth-token-access']
    const requesteeEmail = jwt.decode(payload, process.env.ACCESS_TOKEN_SECRET).email
    const apiCallDate = new Date();
    console.log(apiCallDate);
    next();
}

module.exports = apiLogger;