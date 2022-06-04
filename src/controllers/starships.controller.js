const starshipService = require('../services/starship.service.js');

class StarshipController {
  constructor(){}

  async getAll(req, res, next) {
    try {
        res.json(await starshipService.getAll());
    } catch (err) {
        console.error(`starship.getAll Error:: `, err.message);
        next(err);
    }
  }
  
  async getById(req, res, next) {
    try {
        res.json({ lala: 'asd' });
    } catch (err) {
        console.error(`starship.getById Error: `, err.message);
        next(err);
    }
  }
  
  async register(req, res, next) {
    try {
      res.json({ lala: 'asd' });
    } catch (err) {
      console.error(`starship.register Error: `, err.message);
      next(err);
    }
  }
}

module.exports = new StarshipController();