"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  async signUp(parameters) {
    const result = await AccessService.signUp(parameters);
    return result;
  }
}

module.exports = new AccessController();
