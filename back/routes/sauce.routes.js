const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.get('/', sauceController.getAllSauces);

router.post("/", uploadMiddleware.uploadImage,sauceController.postNewSauce);
router.get("/:id", sauceController.getSpecificSauce);
router.delete("/:id", sauceController.deleteSpecificSauce);
router.post("/:id/like", sauceController.likeSpecificSauce);
router.put("/:id", sauceController.updateSauce)

module.exports = router;