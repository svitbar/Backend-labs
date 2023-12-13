const express = require('express');

const healthCheckController = require('./controllers/healthCheckController');

const router = express.Router();

router.get('/healthcheck', healthCheckController);

module.exports = router;
