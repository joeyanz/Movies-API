const userModel = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, UnauthenticatedError, BadRequestError } = require("../utils/error-classes");

module.exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().select("-password");
    return res.status(StatusCodes.OK).json({ users, amount: users.length });
};
module.exports.getSingleUser = async (req, res) => {
    const { userId: _id } = req.params;
    const user = await userModel.findOne({ _id }).select("-password");
    if (!user) {
        throw new NotFoundError(`no user found with id ${_id}`);
    }
    res.status(StatusCodes.OK).json(user);
};
module.exports.showCurrentUser = async (req, res) => {
    const { _id } = req.user;
    const user = await userModel.findOne({ _id }).select("-password");
    res.status(StatusCodes.OK).json(user);
};
module.exports.updateCurrentUser = async (req, res) => {
    const { _id } = req.user;
    const { name, email } = req.body;
    const options = { new: true, runValidators: true };
    const user = await userModel.findOneAndUpdate({ _id }, { name, email }, options);
    if (!user) {
        throw new NotFoundError(`no user found with id ${_id}`);
    }
    res.status(StatusCodes.OK).json(user).select("-password");
};
module.exports.updateUserPassword = async (req, res) => {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError("please enter old and new passwords");
    }
    const user = await userModel.findOne({ _id });
    const matched = await user.checkPassword(oldPassword);
    if (!matched) {
        throw new UnauthenticatedError("wrong old password");
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json("password updated");
};
