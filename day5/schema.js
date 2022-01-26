const Joi = require('joi');

/*
Validates description and status.
Both must be given.
*/
exports.updateTodoSchema = Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required(),
});

// Another example can be validating while creating rows
exports.createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
});
