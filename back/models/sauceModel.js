const mongoose = require('mongoose');
const sauceSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
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
        imageUrl: {
            type: String,
            default: ""
        }
    }
)

const sauceModel = mongoose.model("sauce", sauceSchema);
module.exports = sauceModel;