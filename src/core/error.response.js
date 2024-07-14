"use strict";

const STATUS_CODE = require("../utils/httpStatusCode")

const REASON_STATUS = require("../utils/httpReasonStatus")

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS.CONFLICT,
    statusCode = STATUS_CODE.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS.BAD_REQUEST,
    statusCode = STATUS_CODE.BAD_REQUEST
  ) {
    console.log(message);
    console.log(statusCode);
    super(message, statusCode);
  }
}

class ServerError extends ErrorResponse {
  constructor(
    message = REASON_STATUS.INTERNAL_SERVER_ERROR,
    statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.UNAUTHORIZED,
    statusCode = STATUS_CODE.UNAUTHORIZED,
  }) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.NOT_FOUND,
    statusCode = STATUS_CODE.NOT_FOUND,
  }) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor({
    message = REASON_STATUS.FORBIDDEN,
    statusCode = STATUS_CODE.FORBIDDEN,
  }) {
    super(message, statusCode);
  }
}


module.exports = {
  ConflictRequestError,
  BadRequestError,
  ServerError,
  AuthFailureError,
  NotFoundError,
  ForbiddenError
};
