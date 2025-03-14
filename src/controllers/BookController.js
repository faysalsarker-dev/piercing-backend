const OnlineBook = require('../model/onlineBook');
const  sendMail  = require('../middlewares/sendMail');
const mailTemplate = require('../utility/mailTemplate');

const createBooking = async (req, res) => {
    try {
        console.log(req.body,'req.body');
        const booking = new OnlineBook(req.body);
        await booking.save();
        res.status(201).send(booking);
        await sendMail(req.body.email, 'Booking Confirmation', mailTemplate(req.body.name, req.body.bookingDate, req.body.slot));
           
    } catch (error) {
        res.status(400).send(error);
        console.log(error

        );
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await OnlineBook.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
};



const getSlots = async (req, res) => {
    try {
        const { date } = req.params; 
        const bookings = await OnlineBook.find({ bookingDate: date }).select("bookingDate slot -_id");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching slots." });
    }
};



const getBookingById = async (req, res) => {
    try {
        const booking = await OnlineBook.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateBookingById = async (req, res) => {
    try {
        const booking = await OnlineBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteBookingById = async (req, res) => {
    try {
        const booking = await OnlineBook.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    getSlots
};