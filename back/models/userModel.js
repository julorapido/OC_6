const mongoose = require('mongoose');
// Importation de isEMAIL de la bibliothèque validator
const { isEmail} = require('validator');
const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 1024,
    }
},
{
    timestamps: true
}
)

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;