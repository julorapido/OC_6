const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const multer = require("multer");
const upload = multer({ dest: '.uploads/' })

router.get("/", sauceController.getAllSauces);


/////////////////////////////////////////////////////////////////////
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
router.post("/", upload.single("image"),sauceController.postNewSauce);
/////////////////////////////////////////////////////////////////////


router.get("/:id", sauceController.getSpecificSauce);

module.exports = router;