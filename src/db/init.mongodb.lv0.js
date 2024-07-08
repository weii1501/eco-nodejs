"use strict";

const {
  db: { host, port, name },
} = require("../configs/config.mongodb");
const mongoose = require("mongoose");

const connectString = `mongodb://${host}:${port}/${name}`;

mongoose
  .connect(connectString)
  .then((_) => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

if (1 == 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
