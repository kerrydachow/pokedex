// Courtesy of https://scoutapm.com/blog/express-error-handling

const { PokemonBadRequest } = require("../utils/errors/pokemonErrors");

const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err) // adding some color to our logs
    next(err) // calling next middleware
}

// Overrides default express handler if no specific error was specified
const errorValidator = (err, req, res, next) => {
    if (!err.statusCode) {
        return next(new PokemonBadRequest("Bad request."));
    }
    next(err);
}

const errorResponder = (err, req, res, next) => {
    res.status(err.statusCode).json({ error: err, errMsg: err.message });
}

const invalidPathHandler = (req, res, next) => {
    res.redirect('/error')
}

module.exports = {
    errorLogger,
    errorValidator,
    errorResponder,
    invalidPathHandler
}