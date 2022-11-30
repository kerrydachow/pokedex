const jwt = require("jsonwebtoken");
const apiLogModel = require("../models/apiLogModel");

const apiLogger = async (req, res, next) => {
  const apiPathName = req._parsedUrl.pathname;
  if (apiPathName === '/api/v1/logs' || apiPathName === '/api/v1/errorLogs' || apiPathName === '/api/v1/errorLogs400')
    return next();
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
