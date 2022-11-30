const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const analyticsController = require('../controllers/analyticsController');

router.get('/api/v1/pokemonImage/:id?', pokemonController.getPokemonImageById);

router.post('/api/v1/pokemon', pokemonController.postPokemon);

router.put('/api/v1/pokemon/:id?', pokemonController.upsertPokemon);

router.patch('/api/v1/pokemon/:id?', pokemonController.patchPokemon);

router.delete('/api/v1/pokemon/:id?', pokemonController.deletePokemon);

router.get('/api/v1/logs', analyticsController.getApiAnalytics);

router.get('/api/v1/errorLogs', analyticsController.getApiErrorAnalytics);

router.get('/api/v1/errorLogs400', analyticsController.getApi400ErrorAnalytics);

module.exports = router;