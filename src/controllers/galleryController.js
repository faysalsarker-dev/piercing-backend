const path = require('path');
const fs = require('fs');
const GalleryItem = require('../model/GalleryItem');

const uploadPath = path.resolve(__dirname, '../images');

// Create
const createGalleryItem = async (req, res) => {
  try {
    const { type, status = 'active', serial, url } = req.body;

    if (type !== "link" && !req.file) {
      return res.status(400).json({ error: 'File is required for non-link types.' });
    }

    const newItem = new GalleryItem({
      type,
      status,
      serial,
      url: type === "link" ? url : `/${req.file.filename}`,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Read all
const getAllGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ serial: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
const getGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateGalleryItem = async (req, res) => {
  try {
    const { type, status, serial } = req.body;

    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // If new file is uploaded, delete old one
    if (req.file && item.url) {
      const oldFilePath = path.join(uploadPath, path.basename(item.url));
      fs.existsSync(oldFilePath) && fs.unlinkSync(oldFilePath);
      item.url = `/images/${req.file.filename}`;
    }

    if (type) item.type = type;
    if (status) item.status = status;
    if (serial !== undefined) item.serial = serial;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Delete file
    const filePath = path.join(uploadPath, path.basename(item.url));
    fs.existsSync(filePath) && fs.unlinkSync(filePath);

    await item.deleteOne();
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createGalleryItem,
  getAllGalleryItems,
  getGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
