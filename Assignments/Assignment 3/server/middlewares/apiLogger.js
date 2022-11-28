const jwt = require("jsonwebtoken");
const apiLogModel = require("../models/apiLogModel");

const apiLogger = async (req, res, next) => {
  console.log(req);
  const apiPathName = req._parsedUrl.pathname;
  const apiQuery = req._parsedUrl.query;
  const apiPath = req._parsedUrl.path;
  const payload = req.headers["auth-token-access"];
  const requesteeEmail = jwt.decode(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  ).email;
  const apiLog = {
    pathName: apiPathName,
    query: apiQuery,
    path: apiPath,
    requestee: requesteeEmail,
  };
  try {
    await apiLogModel.create(apiLog);
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = apiLogger;
