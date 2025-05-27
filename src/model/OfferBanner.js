const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
content: { type: Schema.Types.Mixed ,required: true},

  imageUrl: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    default: '/',
  },
  displayOn: {
    type: [String],
    default: ['/'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('OfferBanner', offerBannerSchema);
