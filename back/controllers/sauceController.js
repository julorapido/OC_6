const SauceModel = require('../models/sauceModel');
const ObjectID = require("mongoose").Types.ObjectId;
module.exports.getAllSauces = (req, res) => {
    SauceModel.find((err, docs) => {
        if (!err) res.send(docs)
        else {
            res.send(err);
        }
    })
}

module.exports.getSpecificSauce = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(401).error

     try {
                const WholeSauce = await SauceModel.findById(req.params.id);
                return res.status(201).json(WholeSauce)
        }catch(err){
                return res.status(400).send(err);
        }
}



module.exports.postNewSauce = async (req ,res) => {
    const {sauce} = req.body

    sauce = JSON.parse(sauce);
    console.log(sauce);
    const newSauce = new SauceModel({
        userId: sauce.userId,
        name: sauce.name,
        manufacturer: sauce.manufacturer,
        description: sauce.description,
            imageUrl: sauce.imageUrl,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked : []
    })
    try{
        const sauceSave = await newSauce.save();
        return res.status(201).json(sauceSave);
    }
    catch(err){
        return res.status(401).send(err);
    }
}