class PokemonBadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    };
};

class PokemonNotFoundError extends PokemonBadRequest {
    constructor(message) {
        super(message)
        this.statusCode = 404;
    };
};

class PokemonBadRequestMissingID extends PokemonBadRequest {};

class PokemonBadRequestIdParamNotEqualBody extends PokemonBadRequest {};

class PokemonAlreadyExists extends PokemonBadRequest {};

class PokemonIdNotANumber extends PokemonBadRequest {};

class PokemonImageNotFoundError extends PokemonNotFoundError {};

class PokemonDeletionError extends PokemonBadRequest {};

class PokemonValidationError extends PokemonBadRequest {};

module.exports = {
    PokemonBadRequest,
    PokemonBadRequestMissingID,
    PokemonNotFoundError,
    PokemonIdNotANumber,
    PokemonAlreadyExists,
    PokemonImageNotFoundError,
    PokemonBadRequestIdParamNotEqualBody,
    PokemonDeletionError,
    PokemonValidationError,
    
};