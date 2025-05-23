// controllers/priceListController.js
const PriceList = require('../model/PriceList');
const fs = require('fs');
const path = require('path');

// CREATE
exports.createPrice = async (req, res) => {
  try {
    const { title, discountedPrice, regularPrice, description, category ,web} = req.body;
    const image = req.file ? req.file.filename : null;

    const newPriceItem = await PriceList.create({
      title,
      discountedPrice,
      regularPrice,
      description,
      category,
      image,
      web
    });

    res.status(201).json(newPriceItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllPrices = async (req, res) => {
  try {
    const items = await PriceList.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllPricesForWeb = async (req, res) => {
  try {
const {web,category} = req.params

    const items = await PriceList.find({
  web: { $in: ['both', web] },
  category,
}).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE
exports.getPriceById = async (req, res) => {
  try {
    const item = await PriceList.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatePrice = async (req, res) => {
  try {
    const { title, discountedPrice, regularPrice, description, category } = req.body;

    const item = await PriceList.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // If new image uploaded, delete old one
    if (req.file) {
      if (item.image) {
        const oldImagePath = path.join(__dirname, `../uploads/prices/${item.image}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      item.image = req.file.filename;
    }

    item.title = title || item.title;
    item.discountedPrice = discountedPrice || item.discountedPrice;
    item.regularPrice = regularPrice || item.regularPrice;
    item.description = description || item.description;
    item.category = category || item.category;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deletePrice = async (req, res) => {
  try {
    const item = await PriceList.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Delete image file if it exists
    if (item.image) {
      const imagePath = path.join(__dirname, `../images${item.image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
