const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

class ApiError extends Error {
  constructor(statusCode, description) {
    super(description);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

module.exports = { ApiError, httpStatusCodes };
