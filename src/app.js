require("dotenv").config();

const express = require("express");
const { default: helmet } = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express();
const apiRouter = require("./routers");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require("./db/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();

// init routes
app.use("/v1/api", apiRouter);

// handling routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message,
  });
});

module.exports = app;
