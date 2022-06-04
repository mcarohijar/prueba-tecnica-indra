const NaveEspacial = require('../models/starship.model.js');
const errors = require('../errors/errors.js');
const StarshipRepository = require('../providers/starship.provider.js');
const SwapiProvider = require('../providers/swapi.provider.js');

const serviceName = 'starships';

class StarshipService {
  async getAll() {
    // get all
    return StarshipRepository.getAllStarships();
  }

  async getById(request) {
    const { starshipId } = request;
    // get from db
    const starshipModel =  await StarshipRepository.getStarshipById(starshipId);
    // not found exception
    if (!starshipModel) throw new errors.NotFoundException(serviceName);
    return starshipModel;
  }

  async findAndRegister(request) {
    const { starshipId } = request;

    // validate if starship is not already registered
    const starship = await StarshipRepository.getStarshipById(starshipId);
    if (starship) throw new errors.AlreadyExistException(serviceName);

    // get starship from swapi
    const apiResponse = await SwapiProvider.getStarshipById(starshipId);

    // insert starship on db
    const starshipModel = new NaveEspacial({ id: starshipId, ...apiResponse });
    await StarshipRepository.insertstarship(starshipModel);

    // return inserted model
    return starshipModel;
  }
}

module.exports = new StarshipService();