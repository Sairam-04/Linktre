const express = require("express");
const { registerUser, loginUser, sendForgotPasswordEmail, verifyForgotToken, createNewPassword, getUserData } = require("../controller/userController");
const userRouter = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/send-password-reset-email").post(sendForgotPasswordEmail);
userRouter.route("/forgot-password/:token").get(verifyForgotToken);
userRouter.route("/create-new-password").post(createNewPassword);
userRouter.route("/me").get(AuthMiddleware, getUserData);

module.exports = userRouter;