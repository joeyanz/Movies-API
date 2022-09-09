const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const adminPermission = require("../middlewares/permission");
const authenticate = require("../middlewares/authentication");

const userRouter = Router();

// user
userRouter.use(authenticate);
userRouter.get("/me", usersController.showCurrentUser);
userRouter.patch("/me", usersController.updateCurrentUser);
userRouter.patch("/me/password", usersController.updateUserPassword);

// admin
userRouter.use(adminPermission);
userRouter.get("/", usersController.getAllUsers);
userRouter.get("/:userId", usersController.getSingleUser);

module.exports = userRouter;
