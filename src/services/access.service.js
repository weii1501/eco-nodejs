"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const HandleError = require("../utils/HandleError");

const ROLE_SHOP = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static async signUp({ name, email, password }) {
    try {
      // check email exist
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        throw new HandleError(
          JSON.stringify({
            status: 403,
            message: "Shop đã tồn tại",
          })
        );
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
    } catch (error) {
      console.log("err", error);
      if (err instanceof HandleError) {
        throw new HandleError(error.message);
      } else {
        throw new Error();
      }
    }
  }
}

module.exports = AccessService;
