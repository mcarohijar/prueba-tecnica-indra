const starshipService = require('../services/starship.service.js');

class StarshipController {
  constructor(){}

  async getAll(req, res, next) {
    // #swagger.summary = 'get all Starship registered on DB'
    try {
        res.json(await starshipService.getAll());
    } catch (err) {
        console.error(`starship.getAll Error:: `, err.message);
        next(err);
    }
  }
  
  async getById(req, res, next) {
    // #swagger.summary = 'get one Starship registered on DB by id'
    /* #swagger.parameters['starshipId'] = {
        in: 'path',
        description: 'starships ID',
        required: true,
}   */
    try {
        res.json(await starshipService.getById(req.params));
    } catch (err) {
        console.error(`starship.getById Error: `, err.message);
        next(err);
    }
  }
  
  async register(req, res, next) {
    // #swagger.summary = 'register Starship to DB'
    /* #swagger.parameters['starshipId'] = {
        in: 'body',
        description: 'starshipss ID',
        required: true,
        type: 'number',
        schema: {
                    $starshipId: 11
                }
}   */
    try {
      const response = await starshipService.findAndRegister(req.body);
      res.json(response);
    } catch (err) {
      console.error(`starship.register Error: `, err.message);
      next(err);
    }
  }
}

module.exports = new StarshipController();