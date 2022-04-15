const { response } = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const usersGet = async (req, res = response) => {
  const { limit = 5, init = 0 } = req.query;

  const [users, total] = await Promise.all([
    User.find({ state: true }).skip(Number(init)).limit(Number(limit)),
    User.countDocuments({ state: true }),
  ]);

  res.json({ total, users });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  // encrypt pass
  const salt = await bcrypt.genSaltSync();
  user.password = await bcrypt.hashSync(user.password, salt);

  // save data in db
  await user.save();

  res.json({ msg: "Usuario creado", user });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...data } = req.body;

  // TODO validate vs DB

  if (password) {
    // encrypt pass
    const salt = await bcrypt.genSaltSync();
    data.password = await bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);

  res.json({ msg: "Put API", user });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  // const user = await User.findByIdAndUpdate(id, { state: false });

  const user = await User.deleteOne({ _id: id });


  res.json({ user });
};

const usersPatch = (req, res = response) => {
  res.json({ msg: "Patch API" });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
