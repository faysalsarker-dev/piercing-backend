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
    servicesName: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    bookingDate: {
      type: String, // Format: "YYYY-MM-DD"
      required: true
    },
    slot: {
      type: String, // Format: "10:00 AM - 11:00 AM"
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
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
