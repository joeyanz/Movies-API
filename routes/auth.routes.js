const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

// public
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
