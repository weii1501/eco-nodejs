"use strict";

const _ = require("lodash");
const MessageHandler = require("./MessageHandler");

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

module.exports = {
  getInfoData,
  MessageHandler
};
