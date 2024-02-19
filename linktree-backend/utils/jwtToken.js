const sendToken = (user, statusCode, res, message) =>{
    const token = user.generateAuthToken();
    return res.status(statusCode).json({
        success: true,
        message,
        token
    });
}

module.exports = sendToken;