exports.validateBody = (schema) => {
  return (req, res, next) => {
    // Object destructuring
    // Its equivalent to const body = req.body
    const { body } = req;
    const { error } = schema.validate(body, {}); // here, {} is options
    if (error) {
      next(error);
    }
    next();
  };
};
