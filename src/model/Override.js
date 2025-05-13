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
  },
  message: {
    type: String,
    default: "It's an off day. Please choose another date."
  }
});
const DateOverride = mongoose.model('DateOverride', dateOverrideSchema);
module.exports = DateOverride;