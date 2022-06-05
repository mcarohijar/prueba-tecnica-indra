jest.mock('aws-sdk', () => {
  const mPromiseScan = {
    promise: jest
      .fn(() => { return { Items: [] } }) // default mock
      .mockImplementationOnce(() => { return { Items: [{ id: 12 }] } }) // mock for getAll 200
      .mockImplementationOnce(() => { return { Items: [{ id: 3 }] } }) // mock for getId 200
      .mockImplementationOnce(() => { return { Items: [] } }) // mock for register 200
      .mockImplementationOnce(() => {}) // mock for getAll 500
      .mockImplementationOnce(() => { return { Items: [] } }) // mock for getById 404
      .mockImplementationOnce(() => { return { Items: [{ id: 3 }] } }) // mock for register 400
  };
  const mPromisePut = {
    promise: jest.fn(() => { return { Items: [] } }) // default mock
  };
  const mDocumentClient = { put: jest.fn(() => mPromisePut), scan: jest.fn(() => mPromiseScan) };
  const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
  return { DynamoDB: mDynamoDB };
});

jest.mock("axios");