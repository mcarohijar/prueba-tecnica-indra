const express = require('express');
const starshipsController = require('../controllers/starships.controller.js');
const starshipValidator = require('../middlewares/starship.middleware.js');
const router = express.Router();

/* list all starships on db */
router.get('/', starshipsController.getAll);

/* get one starship */
router.get('/:starshipId', starshipValidator('getByIdSchema', 'get'), starshipsController.getById);

/* register a starship from SWAPI */
router.post('/register', starshipValidator('registerSchema'), starshipsController.register);

module.exports = router;