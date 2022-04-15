const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-access-token") || req.query['x-access-token'] || req.body['x-access-token'] ;

  if (!token) {
    return res.status(401).json({ msg: "No se envio un token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findById(uid);
    req.user = user;

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = {
  validateJWT,
};
