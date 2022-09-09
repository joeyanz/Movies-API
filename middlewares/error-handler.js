const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };
    // invalid data
    if (err.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    // duplicated data
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    // invalid ID
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
