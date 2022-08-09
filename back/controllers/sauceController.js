const SauceModel = require('../models/sauceModel');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');

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
        return res.status(403).error

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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    
     const getSauce = await SauceModel.findById(req.params.id);
    const filename = getSauce.imageUrl.split('/images/')[1];
    fs.unlink(`uploads/${filename}`, (err => {if (err) console.log(err)}));
    console.log(filename);
       SauceModel.findByIdAndDelete(req.params.id,
            (err ,docs) => {
               if (!err) res.send(docs)
               else res.send(err)
           }
       );

}


module.exports.likeSpecificSauce = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(403).error

    const like = req.body.like

    if (ObjectID.isValid(req.body.userId) == true){
        SauceModel.findOne({
            _id: req.params.id
        }).then(sauce => {
            if (like == 0){
                if (sauce.usersLiked.indexOf(req.body.userId) != -1){ //// User dans la table Liked
                    sauce.likes--; // Annulation du like
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                }else {
                    sauce.dislikes--; // Annulation du dislike
                    sauce.userDisliked.splice(sauce.userDisliked.indexOf(req.body.userId), 1);
                }
                sauce.save();
            }
             if (like == 1){
                if (sauce.usersLiked.indexOf(req.body.userId) != -1){ //// User deja dans table Liked
                    return res.status(401).send("User already liked post");
                }else {
                    sauce.likes++;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save();
                }
        
            }
            else if (like == -1){
                if (sauce.userDisliked.indexOf(req.body.userId) != -1){ //// User deja dans table Disliked
                    return res.status(401).send("User already disliked post");
                }else {
                    sauce.dislikes++;
                    sauce.userDisliked.push(req.body.userId);
                    sauce.save();
                }
               
            }
            return res.status(200).json(sauce);
        } 
        ).catch(err => {
            res.status(401).send(err);
        })

    }else {
       console.log("Wrong user id")
       return res.status(401).send("wrong user id")
   }
} 

module.exports.updateSauce = async (req,res) => {
    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    if (req.file){
        console.log("pas d'image");
        return ("e")
    }else {
        console.log("image présente");
    }

} 