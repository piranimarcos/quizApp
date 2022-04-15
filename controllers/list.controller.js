const { response } = require("express");

const List = require("../models/list.model");
const Question = require("../models/question.model");

const listsGet = async (req, res = response) => {
  const { userId } = req.query

  try {
    const lists = await List.find({ userId });
    const total = lists.length;

    res.json({ total, lists });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};


const listsPopulateGet = async (req, res = response) => {
  const { userId } = req.query 

  // console.log("userId", userId)

  try {
    const lists = await List.find({ userId }, undefined, { populate: [{path: 'userId', options: {strictPopulate: false}},{path: 'questions', options: {strictPopulate: false}}],});
    const total = lists.length;

    console.log(lists)
    res.json({ total, lists });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const listsPost = async (req, res = response) => {
  const { userId, title } = req.body || req.query || req.params;
  try {
    const list = new List({ userId, title });

    // save data in db
    await list.save();

    res.json({ msg: "Lista creada", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};


const listsPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...data } = req.body;
  try {
    const list = await List.findByIdAndUpdate(id, data);
    res.json({ msg: "Lista editada con exito", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const listsDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id);
    if (!list) res.status(400).json({ msg: "No se encuentra la lista" });

    
    //delete questions in list
    await Question.deleteMany({ listId: list._id });

    //delete list
    await List.deleteOne({ _id: id });

    res.json({ msg: "Lista eliminada con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

module.exports = {
  listsGet,
  listsPopulateGet,
  listsPost,
  listsDelete,
  listsPut,
};
