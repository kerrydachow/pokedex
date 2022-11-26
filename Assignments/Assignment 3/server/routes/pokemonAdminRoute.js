const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/api/v1/pokemonImage/:id?', pokemonController.getPokemonImageById);

router.post('/api/v1/pokemon', pokemonController.postPokemon);

router.put('/api/v1/pokemon/:id?', pokemonController.upsertPokemon);

router.patch('/api/v1/pokemon/:id?', pokemonController.patchPokemon);

router.delete('/api/v1/pokemon/:id?', pokemonController.deletePokemon);

module.exports = router;