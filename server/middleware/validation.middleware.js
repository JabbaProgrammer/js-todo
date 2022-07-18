const reqQueryValidator = (schema) => (req, _res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.query);

  if (validationError) {
    next(new Error(`Invalid request query: ${getMessage(validationError)}`));
    return;
  }

  req.query = validValue;
  next();
};

const reqBodyValidator = (schema) => (req, _res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.body);

  if (validationError) {
    next(new Error(`Invalid request body: ${getMessage(validationError)}`));
    return;
  }

  req.body = validValue;
  next();
};

const resBodyValidator = (schema) => (_req, res) => {
  if (debug) {
    const { error: validationError } = schema.validate(res.body, { abortEarly: false });
    // eslint-disable-next-line no-underscore-dangle
    res.body.__res_errors = !validationError
      ? null
      : validationError.details.map(
        (ed) => ({ message: ed.message, path: ed.path }),
      );
  }

  res.send(res.body);
};

module.exports = {
  reqQueryValidator,
  reqBodyValidator,
  resBodyValidator
}