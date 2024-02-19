const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.registerUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      return next(new ErrorHandler(400, "Data sent is not valid"));
    }
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(new ErrorHandler(400, "User Already Exists"));
    }
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    sendToken(newUser, 201, res, "Registered Successfully");
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "User data is not in valid format",
      });
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;
    if (regex.test(username)) {
      user = await User.findOne({ email: username });
    } else {
      user = await User.findOne({ username: username });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, Please Register",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match, Please enter Correct Password",
      });
    }
    sendToken(user, 200, res, "Logined Successfully");
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};
