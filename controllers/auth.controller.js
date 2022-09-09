const userModel = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../utils/error-classes");
const { UnauthenticatedError } = require("../utils/error-classes");
const { addTokenToCookies } = require("../utils/tokens");

module.exports.register = async (req, res) => {
    delete req.body.role;
    const user = await userModel.create(req.body);
    addTokenToCookies(res, user._id);
    const data = { name: user.name, role: user.role, id: user._id };
    return res.status(StatusCodes.CREATED).json(data);
};
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please enter email and password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    const matched = await user.checkPassword(password);
    if (!matched) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    addTokenToCookies(res, user._id);
    const data = { name: user.name, role: user.role, id: user._id };
    return res.status(StatusCodes.OK).json(data);
};
module.exports.logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true });
    return res.status(StatusCodes.OK).json({ message: "Logged out" });
};
