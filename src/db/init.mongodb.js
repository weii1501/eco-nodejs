"use strict";
const {
  db: { host, port, name },
} = require("../configs/config.mongodb");
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  

  constructor() {
    this.connect();
  }
  connect() {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        countConnect();
        console.log("MongoDB connected");
      })
      .catch((err) => console.error(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongo = Database.getInstance();

module.exports = instanceMongo;
