const pokemonModel = require("../models/pokemonModel");
const asyncWrapper = require("../utils/asyncWrapper");
const { DatabaseReadingError } = require("../utils/errors/dbErrors");
const {
    PokemonIdNotANumber,
    PokemonBadRequestMissingID,
    PokemonNotFoundError,
    PokemonAlreadyExists,
    PokemonImageNotFoundError,
    PokemonBadRequestIdParamNotEqualBody,
    PokemonDeletionError,
    PokemonValidationError
} = require("../utils/errors/pokemonErrors");
const {
    QueryNotANumber
} = require("../utils/errors/queryErrors");

global.pokemon = null;

// invoke async function to get pokemonModel
(async () => {
    pokemon = await pokemonModel();
})();

const getPokemons = asyncWrapper(async (req, res, next) => {
    const { count, after } = req.query;
    if (isNaN(parseInt(count)) && count)
        return next(new QueryNotANumber(`count="${count}" is not a number`))
    if (isNaN(parseInt(after)) && after)
        return next(new QueryNotANumber(`after="${after}" is not a number`))
    let result;
    try {
        switch (true) {
            case (count == undefined && after == undefined):
                result = await pokemon
                    .find({})
                    .sort('id');
                break;
            case (count === undefined):
                result = await pokemon
                    .find({ id: { $gt: after } })
                    .sort('id');
                break;
            case (after == undefined):
                result = await pokemon
                    .find({})
                    .sort('id')
                    .limit(count);
                break;
            default:
                result = await pokemon
                    .find({ id: { $gt: after } })
                    .sort('id')
                    .limit(count);
        }
    } catch (err) {
        return next(DatabaseReadingError(err.message));
    }

    res.status(200).json(result);
})

const getPokemonById = asyncWrapper(async (req, res, next) => {
    const pokemonID = req.params.id;
    if (!pokemonID)
        return next(new PokemonBadRequestMissingID(`Missing id param.`))
    if (isNaN(parseInt(pokemonID)))
        return next(new PokemonIdNotANumber(`"${pokemonID}" is not a number.`))
    try {
        let result = await pokemon.find({ id: pokemonID })
        if (result.length < 1) {
            return next(new PokemonNotFoundError(`Pokemon #${pokemonID} does not exist.`))
        }
        res.status(200).json(result);
    } catch (err) {
        return next(DatabaseReadingError(err.message));
    }
})

const postPokemon = asyncWrapper(async (req, res, next) => {
    let checkIfPokemonExist = await pokemon.find({ id: req.body.id })
    if (checkIfPokemonExist.length != 0)
        return next(new PokemonAlreadyExists(`Pokemon ID: ${req.body.id} already exists.`));
    pokemon.create(
        req.body,
        (err, doc) => {
            if (err)
                return next(new PokemonValidationError(err.message));
            res.json({ msg: "Added Successfully", pokeInfo: doc });
        }
    )
})

const getPokemonImageById = asyncWrapper(async (req, res, next) => {
    let pokemonID = req.params.id
    if (!pokemonID)
        return next(new PokemonBadRequestMissingID(`Missing id param.`))
    if (isNaN(parseInt(pokemonID)))
        return next(new PokemonIdNotANumber(`"${pokemonID}" is not a number.`))
    let pokemonImageString = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/XXX.png"
    if (parseInt(pokemonID) < 1 || parseInt(pokemonID) > 809) {
        return next(new PokemonImageNotFoundError(`Pokemon #${pokemonID} image does not exist.`))
    }
    while (pokemonID.length < 3) {
        pokemonID = "0" + pokemonID;
    }
    res.json({ url: `${pokemonImageString.replace(/XXX/, pokemonID)}` });
})

const upsertPokemon = asyncWrapper(async (req, res, next) => {
    let pokemonID = req.params.id
    if (!pokemonID)
        return next(new PokemonBadRequestMissingID(`Missing id param.`))
    if (isNaN(parseInt(pokemonID)))
        return next(new PokemonIdNotANumber(`"${pokemonID}" is not a number.`))
    if (req.params.id != req.body.id)
        return next(new PokemonBadRequestIdParamNotEqualBody(`param: ${req.params.id} != body: ${req.body.id}`))
    pokemon.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        {
            new: true, // return the updated pokemon values
            overwrite: true, // to overwrite entire document
            upsert: true,
            runValidators: true // ensure the PUTjson follows the model
        }, (err, doc) => {
            if (err)
                return next(new PokemonValidationError(err.message));
            res.json({ msg: "Updated Successfully", pokeInfo: doc });
        }
    );
})

const patchPokemon = asyncWrapper(async (req, res, next) => {
    let pokemonID = req.params.id;
    if (!pokemonID)
        return next(new PokemonBadRequestMissingID(`Missing id param.`))
    if (isNaN(parseInt(pokemonID)))
        return next(new PokemonIdNotANumber(`"${pokemonID}" is not a number.`))
    let checkIfPokemonExists = await pokemon.find({ id: req.params.id })
    if (checkIfPokemonExists.length < 1)
        return (next(new PokemonNotFoundError(`Pokemon ${req.params.id} does not exist.`)));
    pokemon.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        {
            new: true, // return the updated pokemon values
            upsert: false, // we are only patching, if no pokemon found, update nothing
            runValidators: true // ensure the PATCH json follows the model
        }, (err, doc) => {
            if (err)
                return next(new PokemonValidationError(err.message));
            res.json({ msg: "Updated Successfully", pokeInfo: doc });
        })
})

const deletePokemon = asyncWrapper(async (req, res, next) => {
    let pokemonID = req.params.id;
    if (!pokemonID)
        return next(new PokemonBadRequestMissingID(`Missing id param.`))
    if (isNaN(parseInt(pokemonID)))
        return next(new PokemonIdNotANumber(`"${pokemonID}" is not a number.`))
    let checkIfPokemonExists = await pokemon.find({ id: req.params.id })
    if (checkIfPokemonExists.length < 1)
        return (next(new PokemonNotFoundError(`Pokemon ${req.params.id} does not exist.`)))
    pokemon.deleteOne({ id: req.params.id },
        (err) => {
            if (err)
                return next(new PokemonDeletionError(`Failed to delete Pokemon #${pokemonID}.`))
            res.json({ msg: "Deleted Successfully" });
        })
})

module.exports = {
    getPokemons,
    getPokemonById,
    postPokemon,
    getPokemonImageById,
    upsertPokemon,
    patchPokemon,
    deletePokemon
}
