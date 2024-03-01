const express = require("express");
const { registerUser, loginUser, sendForgotPasswordEmail } = require("../controller/userController");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/send-password-reset-email").post(sendForgotPasswordEmail);

module.exports = userRouter;