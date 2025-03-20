const express = require('express');
const PriceListController = require('../controllers/PriceListController');

const router = express.Router();

// Route to get all prices
router.get('/', PriceListController.getAllPrices);

// Route to get a price by ID


// Route to create a new price
router.post('/', PriceListController.createPrice);

// Route to update a price by ID
router.put('/:id', PriceListController.updatePrice);

// Route to delete a price by ID
router.delete('/:id/:category', PriceListController.deletePrice);

module.exports = router;