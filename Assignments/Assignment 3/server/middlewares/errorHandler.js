// Courtesy of https://scoutapm.com/blog/express-error-handling

const { PokemonBadRequest } = require("../utils/errors/pokemonErrors");
const apiErrorLogModel = require("../models/apiErrorLogModel");

const errorLogger = (err, req, res, next) => {
  console.error("\x1b[31m", err); // adding some color to our logs
  next(err); // calling next middleware
};

// Overrides default express handler if no specific error was specified
const errorValidator = (err, req, res, next) => {
  if (!err.statusCode) {
    return next(new PokemonBadRequest("Bad request."));
  }
  next(err);
};

// Logs the Error into database
const errorApiLogger = async (err, req, res, next) => {
  let apiPathName = req._parsedUrl.pathname;
  let apiQuery = req._parsedUrl.query;
  const apiPath = req._parsedUrl.path;
  if (apiPathName === apiPath) {
    if (apiPathName.match(new RegExp('(?:.(?!/))+$'))) {
      apiQuery = apiPathName.match(new RegExp('(?:.(?!/))+$'))[0];
    }
    apiPathName = apiPathName.replace(new RegExp('(?:.(?!/))+$'), "");
  }
  const errorStatusCode = err.statusCode;
  const errorResponseCode = Math.floor(errorStatusCode / 100) * 100;
  const apiErrorLog = {
    pathName: apiPathName,
    query: apiQuery,
    path: apiPath,
    statusCode: errorStatusCode,
    responseCode: errorResponseCode,
  };
  try {
    await apiErrorLogModel.create(apiErrorLog);
  } catch (err) {
    console.log(err);
  }
  next(err);
};

const errorResponder = (err, req, res, next) => {
  res.status(err.statusCode).json({ error: err, errMsg: err.message });
};

const invalidPathHandler = (req, res, next) => {
  res.redirect("/error");
};

module.exports = {
  errorLogger,
  errorValidator,
  errorApiLogger,
  errorResponder,
  invalidPathHandler,
};
