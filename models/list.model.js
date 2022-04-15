const { Schema, model } = require("mongoose");
const Question = require("./question.model");

const listSchema = Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

module.exports = model("List", listSchema);
