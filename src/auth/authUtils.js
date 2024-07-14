"use strict";

const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");
const {
  AuthFailureError,
  NotFoundError,
  ServerError,
} = require("../core/error.response");
const KeyTokenService = require("../services/keyToken.service");

const secretKey = "your-secret-key";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHENTICATION: "authentication",
  CLIENT_ID: "x-client-id",
};

async function createTokenPair(payload, publicKey, privateKey) {
  try {
    // accessToken
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(
      accessToken,
      privateKey,
      (err, decoded) => {
        if (err) {
          console.log(`Error:: ${err}`);
        } else {
          console.log(`Decoded:: ${decoded}`);
        }
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return error;
  }
}

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
 
  if (!userId) throw new AuthFailureError("Invalid request");

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  const accessToken = req.headers[HEADER.AUTHENTICATION];
  if (!accessToken) throw new AuthFailureError("Invalid request");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid UserId");

    req.keyStore = keyStore;
    next();
  } catch (error) {
    console.log(error);
    throw new ServerError("Server Error");
  }
});

const verifyJWT = async (token, secretKey) => {
  return await JWT.verify(token, secretKey);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT
};
