const LinksData = require("../models/dataModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createLink = async (req, res, next) =>{
    try {
        req.body.user = req.user._id;
        const existingData = await LinksData.findOne({user: req.user._id});
        if(existingData){
            return next(new ErrorHandler(400, "User has an Existing Social Links"));
        } 
        const link = await LinksData.create(req.body);
        return res.status(200).json({
            success: true,
            message: `${req.body.linkTitle || "Link"} Successfully added`
        }) 
    } catch (error) {
        return next(new ErrorHandler(400, "Unable to create a Link"));
    }
}

exports.addLink = async (req, res, next) =>{
    try {
        const user_id = req.user._id;
        if(!user_id){
            return next(new ErrorHandler(400, "User Not Found"));
        }
        const links = await LinksData.findOne({user: user_id});
        if(!links){
            return next(new ErrorHandler(400, "User Not Registered"))
        }
        const newLinksData = req.body;
        if(!newLinksData){
            return next(new ErrorHandler(400, "Data is not Valid!"));
        }
        await links.socials.push(newLinksData);
        links.save();
        return res.status(200).json({
            success: true,
            message: `${newLinksData.linkTitle || "Link"} Successfully added`,
        })
    } catch (error) {
        return next(new ErrorHandler(400, "Unable to create a Link"));
    }
}