"use strict";

const keytokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      // // level 0
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });

      // level xxx
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findByUserId(userId) {
    return await keytokenModel.findOne({ user: userId }).lean();
  }

  static async removeKeyById(id) {
    return await keytokenModel.deleteMany({ _id: id });
  }

  static async findByRefreshToken(refreshToken) {
    return await keytokenModel.findOne({ refreshToken }).lean();
  }

  static async findByRefreshTokensUsed(refreshToken) {
    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  }

  static async deleteKyById(userId) {
    return await keytokenModel.deleteOne({ user: userId });
  }
}

module.exports = KeyTokenService;
