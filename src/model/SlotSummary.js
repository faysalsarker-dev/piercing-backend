const mongoose = require('mongoose');

const slotSummarySchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true
  },
  slots: [
    {
      time: String, 
      user: {
        name: String,
        email: String,
        phone: String
      }
    }
  ]
}, {
  timestamps: true
});

const SlotSummary = mongoose.model('SlotSummary', slotSummarySchema);

module.exports = SlotSummary;
