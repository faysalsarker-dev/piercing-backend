const express = require('express');
const router = express.Router();
const priceListController = require('../controllers/PriceListController');
const { upload } = require('../middlewares/imagesUpload');




// CREATE
router.post('/', upload.single('image'), priceListController.createPrice);

// GET ALL
router.get('/', priceListController.getAllPrices);

router.get('/:web/:category', priceListController.getAllPricesForWeb);

// GET SINGLE
router.get('/:id', priceListController.getPriceById);

// UPDATE
router.put('/:id', upload.single('image'), priceListController.updatePrice);

// DELETE
router.delete('/:id', priceListController.deletePrice);

module.exports = router;
