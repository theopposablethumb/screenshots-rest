const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.post('/screenshot', controllers.postScreenshot)

module.exports = router;