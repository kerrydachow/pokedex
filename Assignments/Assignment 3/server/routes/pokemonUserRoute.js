const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/api/v1/pokemons', pokemonController.getPokemons);

router.get('/api/v1/pokemon/:id?', pokemonController.getPokemonById);

module.exports = router;