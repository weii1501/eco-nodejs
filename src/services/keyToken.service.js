"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey }) {
    try {
      const tokens = await keytokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = KeyTokenService;
