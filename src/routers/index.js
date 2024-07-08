"use strict";

const express = require("express");
const accessRouter = require("./access");
const { apiKey, permissions } = require("../auth/checkAuth");

const apiRouter = express.Router();

// check apiKey
apiRouter.use(apiKey)

// check permission
apiRouter.use(permissions("0000"));

apiRouter.use("/shop", accessRouter);

module.exports = apiRouter;
