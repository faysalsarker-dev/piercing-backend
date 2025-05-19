// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const {
  createGalleryItem,
  getAllGalleryItems,
  getGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

const { upload } = require('../middlewares/imagesUpload');

// Create
router.post('/', upload.single('file'), createGalleryItem);

// Read
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItem);

// Update
router.put('/:id', upload.single('file'), updateGalleryItem);

// Delete
router.delete('/:id', deleteGalleryItem);

module.exports = router;
