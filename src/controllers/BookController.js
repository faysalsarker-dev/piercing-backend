const OnlineBook = require('../model/onlineBook');
const  sendMail  = require('../middlewares/sendMail');
const mailTemplate = require('../utility/mailTemplate');
const cron = require('node-cron');
const adminMail = require('../utility/adminMail');




cron.schedule('0 0 * * *', async () => {  
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);  
  
    await Booking.deleteMany({ bookingDate: { $lt: twoDaysAgo } });
  
    console.log('Bookings older than 2 days deleted successfully.');
  });








const createBooking = async (req, res) => {
    try {
        const booking = new OnlineBook(req.body);
        await booking.save();
        res.status(201).send(booking);
        await sendMail(req.body.email, 'Booking Confirmation', mailTemplate(req.body.name, req.body.bookingDate, req.body.slot));
        await sendMail(process.env.EMAIL_AUTHOR,'New Booking Received',adminMail(req.body.name,req.body.phone,req.body.slot,req.body.email,req.body.bookingDate))
    } catch (error) {
        res.status(400).send(error);
        console.log(error

        );
    }
};

const getAllBookings = async (req, res) => {
    try {
        const { dateQuery, date } = req.query;

        let filter = {};

        if (dateQuery === 'today') {
            filter = { bookingDate: { $gte: date } }; 
        } else if (dateQuery === 'yesterday') {
            filter = { bookingDate: { $lt: date } }; 
        }

        const bookings = await OnlineBook.find(filter);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
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





const getTodaysBookings = async (req, res) => {
    try {
        const { date } = req.params; 
        const bookings = await OnlineBook.find({ bookingDate: date }).sort({slot: 1});
        res.status(200).json(bookings);
        console.log(bookings);
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
    getSlots,
    getTodaysBookings
};