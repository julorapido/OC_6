const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

module.exports.checkUser = (req, res) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) =>{
            if (err){
                res.status(401).send(err);
            }else {
                let user = await UserModel.findById(decodedToken.id);
                console.log(decodedToken.id)
                res.status(200).json(user);
            }
        })
    }else{
        res.status(401).send(err);
        console.log('No token');
    }
}