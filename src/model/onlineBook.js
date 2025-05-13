const mongoose = require('mongoose');

const onlineBookSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    service: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    bookingDate: {
      type: String, 
      required: true
    },
    slot: {
      type: String, 
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    }
  },
  {
    timestamps: true
  }
);

onlineBookSchema.index({ bookingDate: 1, status: 1 });
const OnlineBook = mongoose.model('OnlineBook', onlineBookSchema);
module.exports = OnlineBook;
