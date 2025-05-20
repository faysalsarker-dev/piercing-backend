// models/GalleryItem.js
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video','link'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  serial: {
    type: Number,
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
