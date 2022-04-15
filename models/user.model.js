const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "El usename es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  }
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", userSchema);
