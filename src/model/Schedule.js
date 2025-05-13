const mongoose = require('mongoose');


const weeklyScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
weeklyScheduleSchema.index({ day: 1 });

const WeeklySchedule = mongoose.model('WeeklySchedule', weeklyScheduleSchema);
module.exports = WeeklySchedule;
