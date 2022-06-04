const axios = require('axios');
const errors = require('../errors/errors.js');
const { SWAPI_URL } = process.env;

const STARSHIP_URL = `${SWAPI_URL}/starships`;

async function getStarshipById(starshipId) {
  let apiResponse = null;
  try {
    const getStarshipUrl = `${STARSHIP_URL}/${starshipId}`;
    const { data } = await axios.get(getStarshipUrl);
    apiResponse = data;
  } catch (err) {
    console.log('get starship from swapi Error: ', err.message);
    throw new errors.ApiConnectionException('starships');
  }
  return apiResponse;
}

module.exports = {
  getStarshipById,
}
