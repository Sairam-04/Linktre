const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
    linkTitle:{
        type: String,
        required: true
    },
    linkUrl:{
        type: String,
        required: true
    },
    visibility:{
        type: Boolean,
        default: false
    },
    isStarred:{
        type: Boolean,
        default: false
    }
})

const dataSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    socials: [
        socialSchema
    ],
    theme:{
        type: String
    }
});

module.exports = mongoose.model("LinksData", dataSchema);