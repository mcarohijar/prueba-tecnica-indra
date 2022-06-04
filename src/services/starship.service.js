const dbConnection = require('../configs/db.config.js');
const Starship = require('../models/starship.model.js');

const { STARSHIPS_COLLECTION } = process.env;

class StarshipService {
  constructor() {}
  async getAll() {
    const params = {
      TableName: STARSHIPS_COLLECTION,
    };
    try {
      const response = await dbConnection.scan(params).promise();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = new StarshipService();