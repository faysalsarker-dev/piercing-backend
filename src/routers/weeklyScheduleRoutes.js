const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getScheduleByDay,
  updateSchedule,
  deleteSchedule
} = require('../controllers/ScheduleController');

// Route to create a new weekly schedule
router.post('/', createSchedule);

// Route to get all weekly schedules
router.get('/', getAllSchedules);
// Route to get a specific schedule by day
router.get('/:day', getScheduleByDay);

// Route to update the schedule for a specific day
router.put('/:day', updateSchedule);

// Route to delete the schedule for a specific day
router.delete('/:day', deleteSchedule);

module.exports = router;
