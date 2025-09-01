const express = require('express');
const router = express.Router();
const { getLatest } = require('../controllers/sensorController');

router.get('/latest', getLatest);

module.exports = router;
