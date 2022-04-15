const { validationResult } = require("express-validator");

const validateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({msg: errors.errors[0].msg});
  }
  next();
};

module.exports = {
  validateData,
};
