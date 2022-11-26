const express = require('express');
const router = express.Router();
const { ROUTE_NOT_FOUND } = require('../utils/constants');

router.get('/error', (req, res) => res.status(404).json({errMsg: ROUTE_NOT_FOUND}));

module.exports = router;