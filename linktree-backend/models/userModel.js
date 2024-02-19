const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "UserName is Required"],
        unique: true,
        minLength: [4, "UserName should contain atleast 4 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Required"],
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minLength: [6, "Password Should be atleast 6 characters"],
    },
    avatar: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE_IN,
        }
    );
    return token;
};

module.exports = mongoose.model("User", userSchema);
