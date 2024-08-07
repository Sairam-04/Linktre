const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID Error(cast to ObjectId Error)
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: '${err.path}`;
        err = new ErrorHandler(400, message);
    }

    // Mongoose Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(400, message);
    }

    // Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try Again!`;
        err = new ErrorHandler(400, message);
    }

    // JWT Token Expire Error
    if(err.name === "TokenExpiredError"){
        const message = `JSON Web Token is Expired, Try Again!`;
        err = new ErrorHandler(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}