const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                message: "Data sent is not valid",
            });
        }
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        await newUser.save();
        return res.status(201).json({
            success: true,
            user: newUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        });
    }
};
