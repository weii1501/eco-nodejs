"use strict";

const STATUS_CODE = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

const REASON_STATUS = {
  FORBIDDEN: "Bad Request Error",
  NOT_FOUND: "Not Found Error",
  CONFLICT: "Conflict Error",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  BAD_REQUEST: "Bad Request Error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.CONFLICT,
    statusCode = STATUS_CODE.CONFLICT,
  }) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.BAD_REQUEST,
    statusCode = STATUS_CODE.BAD_REQUEST,
  }) {
    console.log(message);
    console.log(statusCode);
    super(message, statusCode);
  }
}

class ServerError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.INTERNAL_SERVER_ERROR,
    statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR,
  }) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  ServerError
};
