"use strict";

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
};

const REASON_STATUS = {
  OK: "Success",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.OK,
    reasonStatus = REASON_STATUS.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    options = {},
    message,
    metadata,
    statusCode = STATUS_CODE.CREATED,
    reasonStatus = REASON_STATUS.CREATED,
  }) {
    super({ message, metadata, statusCode, reasonStatus });
    this.options = options;
  }
}

module.exports = {
  OK,
  Created,
  SuccessResponse
};
