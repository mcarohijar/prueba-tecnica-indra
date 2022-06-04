const express = require('express');
const starshipsController = require('../controllers/starships.controller.js');
const router = express.Router();

/* list all starships on db */
router.get('/', starshipsController.getAll);

/* get one starship */
router.get('/:starshipId', starshipsController.getById);

/* register a starship from SWAPI */
router.post('/', starshipsController.register);

module.exports = router;