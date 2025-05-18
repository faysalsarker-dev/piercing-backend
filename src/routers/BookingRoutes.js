const express = require('express');
const { getAllOnlineBookings, getBookingById,myBookings,getSlots,getTodaysBookings, createBooking, updateBookingById, deleteBookingById } = require('../controllers/BookController');

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get('/', getAllOnlineBookings);
router.get('/:id', getBookingById);
router.get('/check-slots/:date', getSlots);
router.get('/todays-book/:date', getTodaysBookings);
router.post('/', createBooking);
router.put('/:id', updateBookingById);
router.delete('/:id', deleteBookingById);
router.get('/my-bookings', myBookings);


module.exports = router;