const LinksData = require("../models/dataModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createLink = async (req, res, next) =>{
    try {
        const user_id = req.user._id;
        if(!user_id){
            return next(new ErrorHandler(400, "User Not Found"));
        }
        const newLinksData = req.body;
        if(!newLinksData){
            return next(new ErrorHandler(400, "Data is not Valid!"));
        }
        const existingData = await LinksData.findOne({user: req.user._id});
        if(existingData){
            existingData.socials.push(newLinksData);
            await existingData.save();
            return res.status(200).json({
                success: true,
                message: `${newLinksData.linkTitle || "Link"} Successfully added`
            }) 
        } 
        const link = await LinksData.create({
            user: user_id,
            socials: [
                newLinksData
            ]
        });
        return res.status(200).json({
            success: true,
            message: `${newLinksData.linkTitle || "Link"} Successfully added`
        }) 
    } catch (error) {
        return next(new ErrorHandler(400, "Unable to create a Link"));
    }
}

exports.editLink = async (req, res, next) =>{
    try {
        const user_id = req.user._id;
        if(!user_id){
            return next(new ErrorHandler(400, "User is not Logined"));
        }
        const {linkId} = req.params;
        if(!linkId){
            return next(new ErrorHandler(400, "Link Doesnot Exists!!"));
        }
        const updatedFields = req.body;
        const updatedObject = {}
        for(const key in updatedFields){
            if(Object.hasOwnProperty.call(updatedFields, key)){
                updatedObject[`socials.$.${key}`] = updatedFields[key]; 
            }
        };
        const links = await LinksData.findOneAndUpdate({"user": user_id, "socials._id": linkId}, 
            {
                $set : updatedObject
            },
            {
                new: true
            }
        );
        if(!links){
            return next(new ErrorHandler(400, "User not Registered"));
        }
        return res.status(200).json({
            success: true,
            message: `Successfully Updated`
        })
    } catch (error) {
        return next(new ErrorHandler(400, "Not able to Update the Link Data"));
    }
};


exports.deleteLink = async (req, res, next) =>{
    try {
        const user_id = req.user._id;
        if(!user_id){
            return next(new ErrorHandler(400, "User is not Logined"));
        }
        const {linkId} = req.params;
        if(!linkId){
            return next(new ErrorHandler(400, "Link Doesnot Exists!!"));
        }
        let link = await LinksData.findOneAndUpdate({"user": user_id});
        if(!link){
            return next(new ErrorHandler(400, "Link Data not found!!"));
        }
        link.socials = link.socials.filter((ele)=> ele._id.toString() !== linkId.toString());
        link.save();
        return res.status(200).json({
            success: true,
            message: "Successfully Deleted the Link"
        })
    } catch (error) {
        return next(new ErrorHandler(400, "Not able to Delete the Data"));
    }
}


exports.getAllLinks = async (req, res, next) =>{
    try {
        const {username} = req.params;
        if(!username){
            return next(new ErrorHandler(400, "User is not Registered"));
        };
        const user = await User.findOne({username: username});
        if(!user){
            return next(new ErrorHandler(400, "User is not Registered"));
        }
        const data = await LinksData.findOne({"user": user._id});
        if(!data){
            return next(new ErrorHandler(400, "Links not found!!!"));
        }
        return res.status(200).json({
            success: true,
            message: "Successfully Fetched all the Links",
            socials: data.socials
        });
    } catch (error) {
        return next(new ErrorHandler(500, "Not able to fetch the Data"));

    }
}