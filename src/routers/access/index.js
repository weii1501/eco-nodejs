"use strict";

const express = require("express");
const accessRouter = express.Router();
const AccessController = require("../../controllers/access.controller");
const MessageHandler = require("../../utils/MessageHandler");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

accessRouter.post("/signup", asyncHandler(AccessController.signUp));
accessRouter.post("/signin", asyncHandler(AccessController.signIn));

accessRouter.use(authentication);

accessRouter.post("/logout", asyncHandler(AccessController.logOut));
accessRouter.post("/refresh", asyncHandler(AccessController.handlerRequest));



module.exports = accessRouter;
