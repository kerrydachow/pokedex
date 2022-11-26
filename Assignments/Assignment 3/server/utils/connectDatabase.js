const { mongoose } = require('mongoose');
const populatePokemons = require('./populatePokemon');

const connectDatabase = async (stalePokemon) => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("Connected to database");
        if (stalePokemon) {
            console.log("Deleting existing pokemon...");
            await pokemon.deleteMany();
            console.log("Populating database...");
            await populatePokemons();
        }
    } catch (error) {
        console.log(error);
        console.log("Failed to connect");
    }
}

module.exports = connectDatabase;