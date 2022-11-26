const mongoose = require('mongoose');
const { BASE_URL, POKEMON_TYPE_PATH } = require('../utils/constants');
const { request } = require("../utils/httpsGet");

const { Schema } = mongoose;

const pokemonModel = () => {
    return new Promise((resolve, reject) => {
        let pokemonTypes = [];
        request(BASE_URL, POKEMON_TYPE_PATH)
            .then((data) => {
                // Get all the English Types
                data.map(e => pokemonTypes.push(e.english));
                const pokemonSchema = new Schema({
                    "base": {
                        "HP": Number,
                        "Attack": Number,
                        "Defense": Number,
                        "Speed": Number,
                        "Special Attack": Number,
                        "Special Defense": Number
                    },
                    "id": Number,
                    "name": {
                        "english": {
                            type: String,
                            maxLength: 20
                        },
                        "japanese": String,
                        "chinese": String,
                        "french": String
                    },
                    "type": {
                        type: [String],
                        enum: pokemonTypes
                    }
                });
                resolve(mongoose.model("pokemons", pokemonSchema));
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    })
}

// Exporting a Promise
module.exports = pokemonModel