const mongoose = require('mongoose');
const sauceSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim    : true,
            lowercase: true
        },
        manufacturer: {
            type: String,
            required: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            lowercase: true
        },
        mainPepper: {
            type: String,
            required: true,
            lowercase: true
        },
        imageUrl: {
            type: String,
            default: "./uploads",
            required: true
        },
        heat: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        likes:{
            type: Number,
            min: 0
        },
        dislikes:{
            type: Number,
            min: 0
        },
        usersLiked:{
            type: [String]
        },
        usersDisliked:{
            type: [String]
        }
        
    }
);



const sauceModel = mongoose.model("sauce", sauceSchema);
module.exports = sauceModel;