"use strict";

const express = require("express");
const accessRouter = express.Router();
const AccessController = require("../../controllers/access.controller");
const MessageHandler = require("../../utils/MessageHandler");

accessRouter.route("/signup").post(async function (req, res) {
    MessageHandler(
        AccessController.signUp,
        req,
        res,
    )
});

module.exports = accessRouter;
