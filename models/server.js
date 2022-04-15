const path = require("path");
const express = require("express");
const cors = require("cors");
const { dbConection } = require("../db/config");

require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.authPath = "/api/auth";
    this.usersPath = "/api/users";
    this.questionsPath = "/api/questions";
    this.listPath = "/api/lists";

    // conect to db
    this.dbConect();

    // Middleware
    this.middlewares();

    // Routes apps
    this.routes();
  }

  async dbConect() {
    await dbConection();


  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // parse
    this.app.use(express.json());
     
    // }

    this.app.use((req,res,next)=>{
      console.log("-------------------------")
      console.log("params",req.params)
      console.log("query",req.query)
      console.log("body",req.body)
      next()
    })
  }

  routes() {
    this.app.use( '/', require("../routes"));
    this.app.use(this.authPath, require("../routes/auth.route"));
    this.app.use(this.usersPath, require("../routes/user.route"));
    this.app.use(this.questionsPath, require("../routes/question.route"));
    this.app.use(this.listPath, require("../routes/list.route"));

  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`App runing in port ${this.port}`);
    });
  }
}

module.exports = Server;
