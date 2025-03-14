const express = require('express');
const { getAllBookings, getBookingById,getSlots, createBooking, updateBookingById, deleteBookingById } = require('../controllers/BookController');

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.get('/check-slots/:date', getSlots);
router.post('/', createBooking);
router.put('/:id', updateBookingById);
router.delete('/:id', deleteBookingById);

module.exports = router;