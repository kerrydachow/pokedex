const { BASE_URL, POKEMON_PATH } = require('./constants');
const { request } = require('./httpsGet');
const ProgressBar = require('progress');

const populatePokemons = async () => {
    const pokeJson = await request(BASE_URL, POKEMON_PATH);
    var bar = new ProgressBar('## inserting :pokeName :bar  :percent :etas ', {
        complete: '\u2588',
        incomplete: '\u2591',
        width: 30,
        total: 809
    });
    const promisePokemon = pokeJson.map(element => {
        return new Promise(async (resolve, reject) => {
            renameJSONKeyName(element.base, 'Sp. Attack', 'Special Attack');
            renameJSONKeyName(element.base, 'Sp. Defense', 'Special Defense')
            try {
                pokemon.create(element)
                    .then(() => {
                        bar.tick({ "pokeName": element.name.english });
                        return resolve("Successfully created pokemon!")
                    })
            } catch (error) {
                return reject(error);
            }
        })
    })
    Promise.all(promisePokemon)
        .then(() => {
            console.log("Successfully populated database!");
        })
}

/**
 * Renames the JSON object key
 * @param jsonObject A JSON Object
 * @param oldName The name of the old JSON Object key
 * @param newName The new name of the JSON Object key
 */
const renameJSONKeyName = (jsonObject, oldName, newName) => {
    jsonObject[newName] = jsonObject[oldName];
    delete jsonObject[oldName];
}

module.exports = populatePokemons;