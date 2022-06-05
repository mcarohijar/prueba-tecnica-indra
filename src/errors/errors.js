const BaseError = require('./baseError.js');
const httpStatusCodes = require('../utils/httpStatusCodes.utils.js');

class BdConnectionError extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Bd connection error.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

class RequestValidationException extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'invalid request',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

class NotFoundException extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

class AlreadyExistException extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Already exist.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

class ApiConnectionException extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Api error.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

module.exports = {
  RequestValidationException,
  NotFoundException,
  BdConnectionError,
  AlreadyExistException,
  ApiConnectionException,
}