"use strict";

const apiKeyModel = require("../models/apikey.model");
// const crypto = require("crypto");

const findById = async (key) => { 
//   const keys = await apiKeyModel.create({
//     key: crypto.randomBytes(64).toString("hex"),
//     permissions: ["0000"],
//   });
  const apiKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return apiKey;
};

module.exports = {
  findById,
};
