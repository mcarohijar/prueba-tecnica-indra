const express = require('express');
const vehiclesController = require('../controllers/starships.controller.js');
const router = express.Router();

/* GET programming languages. */
router.get('/:userId', vehiclesController.getAll);

/* POST programming language */
router.get('/', vehiclesController.getAll);

/* POST programming language */
router.post('/', vehiclesController.getAll);

module.exports = router;