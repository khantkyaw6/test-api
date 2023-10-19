const Joi = require("joi");

const login_schema = Joi.object({
  mail_or_phone: Joi.alternatives()
    .try(
      Joi.string().email().required().messages({
        "string.base": "Invalid email format",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
        "string.empty": "Email can not be empty",
      }),
      Joi.string()
        .pattern(/^\d{9}$|^\d{11}$/)
        .required()
        .messages({
          "string.base": "Invalid phone number format",
          "string.pattern.base": "Invalid phone number format",
          "any.required": "Phone number is required",
          "string.empty": "Phone number can not be empty",
        })
    )
    .required(),
  password: Joi.string().required().min(8),
});

const validateLogin = (req, res, next) => {
  const { error, value } = login_schema.validate(req.body);
  if (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  } else {
    next();
  }
};

module.exports = { validateLogin };
