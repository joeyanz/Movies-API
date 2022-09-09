const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = {
    CustomAPIError,
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
};
