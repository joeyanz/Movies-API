const { UnauthorizedError } = require("../utils/error-classes");

const adminPermission = (req, res, next) => {
    if (req.user.role !== "admin") {
        throw new UnauthorizedError("this route for admin only");
    }
    return next();
};
module.exports = adminPermission;
