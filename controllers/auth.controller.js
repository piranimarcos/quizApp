const { response } = require("express");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");

const singIn = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const singUp = async (req, res = response) => {
  const { name, username, password } = req.body;

  const user = new User({ username, password});

  // encrypt pass
  const salt = await bcrypt.genSaltSync();
  user.password = await bcrypt.hashSync(user.password, salt);

  // save data in db
  await user.save();

  res.json({ msg: "Usuario registrado" });
};

module.exports = {
  singIn,
  singUp
};
