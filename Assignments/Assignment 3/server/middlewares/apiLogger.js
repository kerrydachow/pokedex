const jwt = require("jsonwebtoken");
const apiLogModel = require("../models/apiLogModel");

const apiLogger = async (req, res, next) => {
  let apiPathName = req._parsedUrl.pathname;
  if (apiPathName === '/api/v1/logs' || apiPathName === '/api/v1/errorLogs' || apiPathName === '/api/v1/errorLogs400')
    return next();
  let apiQuery = req._parsedUrl.query;
  const apiPath = req._parsedUrl.path;
  if (apiPathName === apiPath) {
    if (apiPathName.match(new RegExp('(?:.(?!/))+$'))) {
      apiQuery = apiPathName.match(new RegExp('(?:.(?!/))+$'))[0];
    }
    apiPathName = apiPathName.replace(new RegExp('(?:.(?!/))+$'), "");
  }
  let apiRequest = req.method;
  const payload = req.headers["auth-token-access"];
  const requesteeEmail = jwt.decode(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  ).email;
  const apiLog = {
    pathName: apiPathName,
    query: apiQuery,
    path: apiPath,
    request: apiRequest,
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
