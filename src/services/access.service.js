"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const HandleError = require("../utils/HandleError");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");
const keytokenModel = require("../models/keytoken.model");

const ROLE_SHOP = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  /*
  check this token used or not

 */
  static async handleRefreshToken(refreshToken) {
    // check token da duoc su dung chua
    const foundToken = await KeyTokenService.findByRefreshTokensUsed(
      refreshToken
    );
    // neu co

    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      console.log("userId", userId, "email", email);
      // xoa tat ca token cua user
      await KeyTokenService.deleteKyById(foundToken._id);
      throw new ForbiddenError("something went wrong? pls re-login");
    }

    // No
    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);

    if (!holderToken) {
      throw new AuthFailureError("Shop not registered");
    }

    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    );

    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new AuthFailureError("Shop not registered");
    }

    // craete new token pair
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      holderToken.publicKey,
      holderToken.privateKey
    );

    await keytokenModel.findOneAndUpdate(
      { _id: holderToken._id },
      {
        $set: {
          refreshToken: tokens.refreshToken,
        },
        $addToSet: {
          refreshTokensUsed: refreshToken,
        },
      },
      { new: true, useFindAndModify: false } // `new: true` to return the updated document
    );
    return {
      user: { userId: userId, email },
      tokens,
    };
  }

  static async logOut(keyStore) {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log("delKey", delKey);
    return delKey;
  }

  /**
    1. Check email in database
    2. Compare password
    3. Create AT and RT and save to database
    4. Return data
   */

  static async signIn({ email, password, refreshToken = null }) {
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Shop không tồn tại");
    }
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) {
      throw new AuthFailureError("Mật khẩu không đúng");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    // const { privateKey, publicKey } = await KeyTokenService.findByUserId(
    //   foundShop._id
    // );

    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: foundShop._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData({
        fileds: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  }

  static async signUp({ name, email, password }) {
    // try {
    // check email exist
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Email đã tồn tại");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [ROLE_SHOP.SHOP],
    });

    if (newShop) {
      // create privateKey, publicKey
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new HandleError({
          message: "Không thể tạo key token",
          statusCode: 400,
        });
      }

      // create token pair
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      return {
        metadata: {
          shop: getInfoData({
            fileds: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      metadata: null,
    };
    // } catch (error) {
    //   console.log("err", error);
    //   if (error instanceof HandleError) {
    //     throw new HandleError(error.message);
    //   } else {
    //     throw new Error();
    //   }
    // }
  }
}

module.exports = AccessService;
