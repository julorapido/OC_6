const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
);

// play function before save into DB
userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;