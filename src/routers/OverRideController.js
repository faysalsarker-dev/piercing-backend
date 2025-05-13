const express = require('express');
const router = express.Router();
const {
 createOverRide,
  getAllOverRides,
  getOverRideBydate,
  updateOverRide,
  deleteOverRide,
} = require('../controllers/OverRideController');

// Route to create a new weekly schedule
router.post('/', createOverRide);

// Route to get all weekly schedules
router.get('/', getAllOverRides);
// Route to get a specific schedule by day
router.get('/:date', getOverRideBydate);

// Route to update the schedule for a specific day
router.put('/:date', updateOverRide);

// Route to delete the schedule for a specific day
router.delete('/:date', deleteOverRide);

module.exports = router;
