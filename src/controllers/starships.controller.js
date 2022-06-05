const starshipService = require('../services/starship.service.js');

class StarshipController {
  async getAll(req, res, next) {
    // #swagger.summary = 'get all Starship registered on DB'
    try {
        res.json(await starshipService.getAll());
    } catch (err) {
        console.log(`starship.getAll Error:: `, err.message);
        res.status(err.statusCode).send(err);
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
        console.log(`starship.getById Error: `, err.message);
        res.status(err.statusCode).send(err);
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
      res.json(await starshipService.findAndRegister(req.body));
    } catch (err) {
      console.log(`starship.register Error: `, err.message);
      res.status(err.statusCode).send(err);
    }
  }
}

module.exports = new StarshipController();