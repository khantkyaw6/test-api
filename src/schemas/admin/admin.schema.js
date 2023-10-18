const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be string.",
    "any.required": "Name is required.",
    "string.empty": "Name cannot be an empty field",
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateAdmin = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  } else {
    next();
  }
};

module.exports = { validateAdmin };
