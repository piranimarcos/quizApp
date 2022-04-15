const { Schema, model } = require("mongoose");

const questionSchema = Schema({
  title: { type: String, required: [true, "la pregunta es obligatoria"] },
  listId: { type: Schema.Types.ObjectId, ref: "List" },
  awnsers: [{ awnser: String, isCorrect: Boolean }],
});

questionSchema.path('awnsers').validate(function (value) {
  console.log(value.length)
  if (value.length > 10) {
    throw new Error("No puede haber mas de 10 preguntas");
  }
});

questionSchema.methods.toJSON = function () {
  const { __v, ...question } = this.toObject();
  return question;
};

questionSchema.statics.deleteById = function (_id) {
  return this.deleteOne({ _id: _id });
};


module.exports = model("Question", questionSchema);
