const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = function (req, res, next){
    try {
        let token = req.header('ltree-token');
        if(!token) 
            return next(new ErrorHandler(401, "Please Login to access this resource"));

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorHandler(400, "Token doesnot Match!! Please verify the Token"));
    }
};
