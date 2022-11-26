const SERVER_PORT = process.env.PORT || 4000;
const LOGIN_PORT = process.env.PORT || 4001;

const BASE_URL = "raw.githubusercontent.com"
const POKEMON_TYPE_PATH = "/fanzeyi/pokemon.json/master/types.json";
const POKEMON_PATH = "/fanzeyi/pokemon.json/master/pokedex.json";
const API_PORT = 443;

const ROUTE_NOT_FOUND = "Improper Route. Please check out the API docs.";

const TOKEN_MAX_AGE = 2 * 60 * 60 * 1000;

module.exports = {
    SERVER_PORT,
    LOGIN_PORT,
    BASE_URL,
    API_PORT,
    POKEMON_TYPE_PATH,
    POKEMON_PATH,
    ROUTE_NOT_FOUND,
    TOKEN_MAX_AGE
}