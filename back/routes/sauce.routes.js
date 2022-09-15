const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const multer = require('../middleware/uploadMiddleware');

const jwtAuth = require('../middleware/authMiddleware');


router.get('/', sauceController.getAllSauces);
router.post("/", multer.uploadImage, sauceController.postNewSauce);
router.get("/:id", sauceController.getSpecificSauce);
router.delete("/:id",sauceController.deleteSpecificSauce);
router.post("/:id/like", sauceController.likeSpecificSauce);
router.put("/:id", multer.uploadImage, sauceController.updateSauce);

router.use("/", jwtAuth.checkToken);


module.exports = router;