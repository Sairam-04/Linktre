const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const crypto = require("crypto");
const {
  FORGOT_PASSWORD_URL,
  FORGOT_PASSWORD_EMAIL_MSG,
  FORGOT_PASSWORD_EMAIL_SUB,
} = require("../constants/constants");
const { sendEmail } = require("../utils/sendEmail");

exports.registerUser = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body)
    if (!body) {
      return next(new ErrorHandler(400, "Data sent is not valid"));
    }
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(new ErrorHandler(400, "User Already Exists"));
    }
    const newUser = new User(body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    sendToken(newUser, 201, res, "Registered Successfully");
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(500, error.message));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new ErrorHandler(500, "User data is not in valid format"));
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;
    if (regex.test(username)) {
      user = await User.findOne({ email: username });
    } else {
      user = await User.findOne({ username: username });
    }
    if (!user) {
      return next(
        new ErrorHandler(400, "User does not exist, Please Register")
      );
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(
        new ErrorHandler(
          400,
          "Password doesn't match, Please enter Correct Password"
        )
      );
    }
    sendToken(user, 200, res, "Logined Successfully");
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

exports.sendForgotPasswordEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(
        new ErrorHandler(400, "Data sent is not valid! Email is Required")
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(400, "User does not exists"));
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiry = new Date();
    resetPasswordExpiry.setHours(resetPasswordExpiry.getMinutes() + 15);

    const resetPasswordLink = FORGOT_PASSWORD_URL({
      protocol: req.protocol,
      host: req.get("host"),
      token: resetPasswordToken,
    });
    const message = FORGOT_PASSWORD_EMAIL_MSG(resetPasswordLink);
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiry = resetPasswordExpiry;
    await user.save();

    await sendEmail({
      email: email,
      subject: FORGOT_PASSWORD_EMAIL_SUB,
      message: message,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(400, "Failed to send Reset Password Email"));
  }
};

exports.verifyForgotToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      return next(new ErrorHandler(400, "Verification token is missing"));
    }
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return next(
        new ErrorHandler(400, "Verification failed, Token not found")
      );
    }
    const currentDate = new Date();
    const expiryDate = new Date(user.resetPasswordExpiry);
    if (currentDate >= expiryDate) {
      return next(new ErrorHandler(400, "Verification failed, Token Expired!"));
    }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(400, "Failed to vertify token"));
  }
};

exports.createNewPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return next(new ErrorHandler(400, "Token and newPassword are required"));
    }
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return next(new ErrorHandler(400, "Verification failed, User not found"));
    }
    const currentDate = new Date();
    const expiryDate = new Date(user.resetPasswordExpiry);
    if (currentDate >= expiryDate) {
      return next(new ErrorHandler(400, "Verification failed, Token Expired!"));
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    sendToken(user, 201, res, "Password Reset Successful");
  } catch (error) {
    return next(new ErrorHandler(400, "Failed to create new Password"));
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    if (!user_id) {
      return next(new ErrorHandler(400, "User Not Found"));
    }
    const user = await User.findById(user_id);
    if(!user){
      return next(new ErrorHandler(400, "User deos not Exists"));
    }
    return res.status(200).json({
      email: user.email, username: user.username
    })
  } catch (error) {
    return next(new ErrorHandler(400, "Failed to fetch User Details"));
  }
};
