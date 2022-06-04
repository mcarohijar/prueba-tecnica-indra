const axios = require('axios');
const dynamoDb = require('../configs/db.config.js');
const dbConnection = require('../configs/db.config.js');
const NaveEspacial = require('../models/starship.model.js');
const errors = require('../errors/errors.js');

const serviceName = 'starships';
const { STARSHIPS_COLLECTION, SWAPI_URL } = process.env;
const STARSHIP_URL = `${SWAPI_URL}/${serviceName}`;

class StarshipService {
  async getAll() {
    const params = {
      TableName: STARSHIPS_COLLECTION,
    };
    try {
      const response = await dbConnection.scan(params).promise();
      return response.Items;
    } catch (err) {
      console.log(err);
      throw new errors.BdConnectionError();
    }
  }

  async getById(request) {
    const { starshipId } = request;

    let dbResponse = null;
    try {
      const parsedStarshipId = typeof starshipId === 'number' ? starshipId : parseInt(starshipId, 10);
      const params = {
        TableName: STARSHIPS_COLLECTION,
        FilterExpression: 'id = :starshipId',
        ExpressionAttributeValues: {
          ":starshipId": parsedStarshipId,
        }
      };
      dbResponse = await dbConnection.scan(params).promise();
    } catch (err) {
      throw new errors.BdConnectionError(serviceName);
    }
    if (!dbResponse.Items.length) throw new errors.NotFoundException(serviceName);
    return dbResponse.Items[0];
  }

  async findAndRegister(request) {
    const { starshipId } = request;

    // validate if starship is not already registered
    let getByIdResponse = null;
    try {
      getByIdResponse = await this.getById(request);
    } catch (err) {
    }
    if (getByIdResponse) throw new errors.AlreadyExistException(serviceName);

    // get starship from swapi
    let apiResponse = null;
    try {
      const getStarshipUrl = `${STARSHIP_URL}/${starshipId}`;
      const { data } = await axios.get(getStarshipUrl);
      apiResponse = data;
    } catch (err) {
      console.log('get starship from swapi Error: ', err.message);
      throw new errors.ApiConnectionException(serviceName);
    }
    console.log({apiResponse});

    // insert starship on db
    const starshipModel = new NaveEspacial({ id: starshipId, ...apiResponse });
    console.log({starshipModel});
    try {
      const params = {
        TableName: STARSHIPS_COLLECTION,
        Item: starshipModel,
      }
      await dynamoDb.put(params).promise();
    } catch (err) {
      console.log('put starship on db Error: ', err.message);
      return err;
    }
    return starshipModel;
  }
}

module.exports = new StarshipService();