const mongoose = require('mongoose');

const slotSummarySchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
    unique: true
  },
  slots: [
    {
      time: String,
      clientDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OnlineBook',
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const SlotSummary = mongoose.model('SlotSummary', slotSummarySchema);

module.exports = SlotSummary;
