const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    options = { expiresIn: process.env.JWT_LIFETIME };
    return jwt.sign({ userId }, process.env.JWT_SECRET, options);
};

const addTokenToCookies = (res, userId) => {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const token = generateToken(userId);
    res.cookie("token", token, { expires, httpOnly: true });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { addTokenToCookies, verifyToken };
