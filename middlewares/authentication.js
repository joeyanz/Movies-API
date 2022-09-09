const { UnauthenticatedError } = require("../utils/error-classes");
const { verifyToken } = require("../utils/tokens");
const userModel = require("../models/user.model");

const authenticate = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError("No token provided");
    }
    try {
        const { userId } = verifyToken(token);
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            throw new UnauthenticatedError("User not found");
        }
        req.user = user;
        return next();
    } catch (error) {
        throw new UnauthenticatedError("invalid token");
    }
};
module.exports = authenticate;
