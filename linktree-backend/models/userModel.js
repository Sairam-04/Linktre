const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "UserName is Required"],
        unique: true,
        minLength: [4, "UserName should contain atleast 4 characters"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email is Required"],
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type: String,
        required: [true, "Password is Required"],
        minLength:[6, "Password Should be atleast 6 characters"],
        maxLength:[10, "Password should not exceed 10 characters"]
    },
    avatar:{
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);
