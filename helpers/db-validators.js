const User = require("../models/user.model");
const List = require("../models/list.model");
const Question = require("../models/question.model");


const isUsernameExist = async (username = "") => {
  const existUser = await User.findOne({ username });
  if (existUser) {
    throw new Error(`El usuario ${username} ya existe`);
  }
};

const isUserByIdExist = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

const isListByIdExist = async (id) => {
  const existList = await List.findById(id);
  if (!existList) {
    throw new Error(`La lista con id ${id} no existe`);
  }
};

const isQuestionByIdExist = async (id) => {
  const existQuestion = await Question.findById(id);
  if (!existQuestion) {
    throw new Error(`La pregunta con id ${id} no existe`);
  }
};

module.exports = {
  isUsernameExist,
  isUserByIdExist,
  isListByIdExist,
  isQuestionByIdExist
};
