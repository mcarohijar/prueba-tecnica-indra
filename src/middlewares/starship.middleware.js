const createHttpError = require('http-errors')
const Joi = require('joi');

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
      const request = type ? req.params : req.body
      try {
          const validated = await Validators[validator].validateAsync(request);
          req.body = validated;
          next();
      } catch (err) {
        return next(createHttpError(422, {message: err.message}));
      }
  }
}