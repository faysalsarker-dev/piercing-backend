 const mongoose = require('mongoose');

 const dateOverrideSchema = new mongoose.Schema({
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
    unique: true
  },
  slots: [String], 
  isDayOff: {
    type: Boolean,
    default: false
  }
});
const DateOverride = mongoose.model('DateOverride', dateOverrideSchema);
module.exports = DateOverride;