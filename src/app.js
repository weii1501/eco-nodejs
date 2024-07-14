require("dotenv").config();

const express = require("express");
const { default: helmet } = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express();
const apiRouter = require("./routers");
const cors = require("cors");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost:6363',
      'http://localhost:7979',
    ],
    credentials: true,
  }),
);

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

// handling errors
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(error);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message,
  });
});

module.exports = app;
