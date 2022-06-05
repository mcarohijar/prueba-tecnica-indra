const Joi = require('joi');
const errors = require('../errors/errors.js');
const httpStatusCodes = require('../utils/httpStatusCodes.utils.js');

const registerSchema = Joi.object({
  starshipId: Joi.number().required(),
});

const getByIdSchema = Joi.object({
  starshipId: Joi.number().required(),
});


const Validators = {
  getByIdSchema,
  registerSchema,
}

module.exports = function(validator, type) {
  return async function(req, res, next) {
      const request = type === 'get' ? req.params : req.body
      try {
          const validated = await Validators[validator].validateAsync(request);
          req.body = validated;
          next();
      } catch (err) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .send(new errors.RequestValidationException(err.message));
      }
  }
}