const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error db conection");
  }
};

module.exports = {
  dbConection,
};
