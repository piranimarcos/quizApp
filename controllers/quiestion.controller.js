const { response } = require("express");

const Question = require("../models/question.model");
const List = require("../models/list.model");

const questionsGet = async (req, res = response) => {
  const { listId } = req.query;

  try {
    const questions = await Question.find({ listId })
    const total = questions.length;

    res.json({ total, questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const questionsPost = async (req, res = response) => {
  const { title, listId, awnsers } = req.body;
  try {
    const question = new Question({ title, listId, awnsers });

    // save data in db
    const questionSave = await question.save();

    //change list with new question
    const list = await List.findById(question.listId);
    list.questions.push(questionSave._id);
    await list.save();

    res.json({ msg: "Pregunta creada", question });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const questionsPut = async (req, res = response) => {
  const { id } = req.params;
  
  try {
    const question = await Question.findByIdAndUpdate(id, req.body);

    //change list with new question
    const list = await List.findById(question.listId);
    list.questions.push(id);
    await list.save();
    
    res.json({ msg: "Preguntada editada con exito", question });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

const questionsDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) res.status(400).json({ msg: "No se encuentra la pregunta" });

    const list = await List.findById(question.listId);
    if (!list) res.status(400).json({ msg: "No se encuentra la lista" });

    //delete question
    await Question.deleteById(id);

    //change list with question delete
    const index = list.questions.indexOf(question.listId); // obtenemos el indice
    list.questions.splice(index, 1);
    await list.save();

    res.json({ msg: "La pregunta se borro con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

module.exports = {
  questionsGet,
  questionsPost,
  questionsDelete,
  questionsPut,
};
