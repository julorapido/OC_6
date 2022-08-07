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
    const newSauce = new SauceModel({
        userId:  req.body.userId,
        name:  req.body.name,
        manufacturer:  req.body.manufacturer,
        description:  req.body.description,
        imageUrl: "http://localhost:4200/",
        heat: req.body.heat,
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

module.exports.deleteSpecificSauce = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(401).error
    
      SauceModel.findByIdAndDelete(req.params.id,
            (err ,docs) => {
                if (!err) res.send(docs)
                else res.send(err)
            }
        )
}