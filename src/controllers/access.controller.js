"use strict";

const { Created, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  handlerRequest = async (req, res, next) => {
    new SuccessResponse({
      message: "Refresh request successfully!",
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    }).send(res);
  };

  logOut = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout successfully!",
      metadata: await AccessService.logOut(req.keyStore),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new Created({
      message: "Register successfully!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  signIn = async (req, res, next) => {
    new SuccessResponse({
      message: "Login successfully!",
      metadata: await AccessService.signIn(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
