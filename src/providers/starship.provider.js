const dbConnection = require('../configs/db.config.js');
const errors = require('../errors/errors.js');

const { STARSHIPS_COLLECTION } = process.env;

async function getAllStarships() {
  const params = {
    TableName: STARSHIPS_COLLECTION,
  };
  try {
    const response = await dbConnection.scan(params).promise();
    return { items: response.Items };
  } catch (err) {
    throw new errors.BdConnectionError();
  }
}

async function getStarshipById(starshipId) {
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
    throw new errors.BdConnectionError('starship');
  }
  if (!dbResponse.Items.length) return null;
  return dbResponse.Items[0];
}

async function insertstarship(starshipModel) {
  try {
    const params = {
      TableName: STARSHIPS_COLLECTION,
      Item: starshipModel,
    }
    await dbConnection.put(params).promise();
  } catch (err) {
    console.log('put starship on db Error: ', err.message);
    return err;
  }
}

module.exports = {
  getAllStarships,
  getStarshipById,
  insertstarship,
}