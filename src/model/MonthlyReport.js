const mongoose = require('mongoose');

const monthlyReportSchema = new mongoose.Schema({
  month: {
    type: String, // Format: 'YYYY-MM' (e.g., '2025-05')
    required: true,
    unique: true,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
  confirmedBookings: {
    type: Number,
    default: 0,
  },
  cancelledBookings: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  topServices: [
    {
      service: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
      revenue: {
        type: Number,
        default: 0,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('MonthlyReport', monthlyReportSchema);
