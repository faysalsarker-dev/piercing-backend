const OnlineBook = require('../model/onlineBook');
const  sendMail  = require('../middlewares/sendMail');
const mailTemplate = require('../utility/mailTemplate');
const cron = require('node-cron');
const adminMail = require('../utility/adminMail');
const cancelMail = require('../utility/cancelMail');




const { subDays, format, startOfDay } = require("date-fns");

cron.schedule('0 0 * * *', async () => {  
    try {
        const twoDaysAgo = startOfDay(subDays(new Date(), 2)); 
        const formattedDate = format(twoDaysAgo, "yyyy-MM-dd"); 

        // Delete bookings older than 2 days
        const result = await OnlineBook.deleteMany({ 
            bookingDate: { $lt: formattedDate } 
        });

        console.log(`Deleted ${result.deletedCount} old bookings.`);
    } catch (error) {
        console.error("Cron job error:", error);
    }
});






  const createBooking = async (req, res) => {
    try {
        const booking = new OnlineBook(req.body);
        await booking.save();

        const formattedDate = format(new Date(req.body.bookingDate), 'EEEE, MMMM d, yyyy');
    

        
        res.status(201).json({ message: "Booking created successfully", booking });
if(req.body.email !== 'N/A'){

    Promise.all([
        sendMail(
            req?.body?.email, 
            'Booking Confirmation', 
            mailTemplate(req.body.name, formattedDate, req.body.slot, req.body.price, req.body.servicesName)
        ),
     
      
        sendMail(
            process.env.EMAIL_AUTHOR, 
            'New Booking Received', 
            adminMail(req.body.name, req.body.phone, req.body.slot, req.body.email,formattedDate, req.body.servicesName,req.body.price)
        )
    ]).catch(err => console.error("Email sending error:", err)); // Catch email errors


}
        

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};


const getAllBookings = async (req, res) => {
    try {
        const { dateQuery } = req.query;

        const formattedDate = format(new Date(), 'yyyy-MM-dd');

        let filter = {};

        if (dateQuery === 'today') {
            filter = { bookingDate: { $gte: formattedDate } }; 
        } else if (dateQuery === 'yesterday') {
            filter = { bookingDate: { $lt: formattedDate } }; 
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
        const bookings = await OnlineBook.find({
            bookingDate: date,
            status: 'confirmed',
          }).select("bookingDate slot status -_id");
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
        let booking = await OnlineBook.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ message: "Booking not found" });
        }

        if (req.body.status === "cancelled") {
            const formattedDate = format(new Date(booking.bookingDate), 'EEEE, MMMM d, yyyy');
            
          if(booking.email !== 'N/A'){

            sendMail(
                req.body.email,
                'Booking Cancellation',
                cancelMail(req.body.name, formattedDate, req.body.slot, req.body.price, req.body.servicesName)
            ).catch(err => console.error("Email sending error:", err));
           

          }
           
            
        }

     
        booking = await OnlineBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).send(booking);
    } catch (error) {
        console.error("Update error:", error);
        res.status(400).send({ message: "Something went wrong", error });
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





const myBookings = async (req, res) => {



  };


module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    getSlots,
    getTodaysBookings,
    myBookings,
    
};