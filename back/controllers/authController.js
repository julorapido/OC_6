const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body);
    try{
        const user = await UserModel.create({
            email: email,
            password: password
        });
        res.status(200).send({user: user._id});
    }catch(err){
        res.status(401).send({err});
    }
}