"use strict";

const JWT = require("jsonwebtoken");

async function createTokenPair(payload, publicKey, privateKey) {
  try {
    // accessToken
    const accessToken = JWT.sign(payload, privateKey, {
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.log(`Error:: ${err}`);
      } else {
        console.log(`Decoded:: ${decoded}`);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  createTokenPair,
};
