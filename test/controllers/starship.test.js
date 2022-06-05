require('../starships.mocks.js');
const { app } = require('../../index.js');
const supertest = require('supertest');
const axios = require('axios');
const request = supertest(app);
const TIMEOUT = 10000;

describe("Starship controller", () => {
  test('Get all starships', async () => {
    const { body } = await request.get('/starships/').timeout(TIMEOUT);
    expect(body.items.length).toStrictEqual(1);
  })  
  
  test('Get starship by id', async () => {
    const { body } = await request.get('/starships/5').timeout(TIMEOUT);
    expect(body).not.toBe(undefined);
  })
  
  test('Register starship by id', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {a: 1} }));
    const { body } = await request.post('/starships/register').send({ starshipId: 2 }).timeout(TIMEOUT);
    expect(body).not.toBe({});
  })

  test('Get all starships: bd connection error', async () => {
    const response = await request.get('/starships/').timeout(TIMEOUT);
    expect(response.error.status).toStrictEqual(500);
  })
  
  test('Get starship by id: starship not found', async () => {
    const response = await request.get('/starships/5').timeout(TIMEOUT);
    expect(response.error.status).toStrictEqual(404);
  })
  
  test('Register starship by id: starship already registed', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {a: 1} }));
    const response = await request.post('/starships/register').send({ starshipId: 2 }).timeout(TIMEOUT);
    expect(response.error.status).toStrictEqual(400);
  })
});