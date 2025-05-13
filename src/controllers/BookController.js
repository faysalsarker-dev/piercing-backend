const OnlineBook = require('../model/onlineBook');
const  sendMail  = require('../middlewares/sendMail');
const mailTemplate = require('../utility/mailTemplate');
const cron = require('node-cron');
const adminMail = require('../utility/adminMail');
const cancelMail = require('../utility/cancelMail');
const adminCancelMail = require('../utility/adminCancelMail');
const userCancelMail = require('../utility/userCancelMail');


const { subDays, format, startOfDay } = require("date-fns");
const { addToAdminCalendar, deleteEventFromCalendar } = require('./GoogleCelender');
const DateOverride = require('../model/Override');
const WeeklySchedule = require('../model/Schedule');

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
     

        const formattedDate = format(new Date(req.body.bookingDate), 'EEEE, MMMM d, yyyy');
    

     
        

        const eventDate = req?.body?.bookingDate;
        const eventTime = req?.body?.slot;
        const [hour, minute] = eventTime.split(':');
        const newHour = String(parseInt(hour) - 1).padStart(2, '0');
        const updatedTime = `${newHour}:${minute}`;
        const eventTitle = req?.body?.servicesName;
        const eventDescription = `New Booking for ${req?.body?.servicesName} at ${req?.body?.bookingDate} ${req?.body?.slot}`;




      const eventId  = await  addToAdminCalendar(eventDate, updatedTime, eventTitle, eventDescription);

const booking = new OnlineBook({ ...req.body , eventId});
await booking.save();


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




// const getSlots = async (req, res) => {
//     try {
//         const { date } = req.params; 
//         const bookings = await OnlineBook.find({
//             bookingDate: date,
//             status: 'confirmed',
//           }).select("bookingDate slot status -_id");
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ error: "Server error while fetching slots." });
//     }
// };







const getSlots = async (req, res) =>  {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  // Check for valid date string
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: 'Invalid date format (expected YYYY-MM-DD)' });
  }

  const dayName = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });

  try {
    // Step 1: Check override first
    const override = await DateOverride.findOne({ date });
    let slots = [];

    if (override) {
      if (override.isDayOff) {
        return res.json([]); 
      }
      slots = override.slots || [];
    } else {
      // Step 2: Fallback to weekly schedule
      const weekly = await WeeklySchedule.findOne({ day: dayName });
      if (!weekly || weekly.isDayOff) {
        return res.json([]); // Day off by weekly rule
      }
      slots = weekly.slots || [];
    }

    // Step 3: Filter out already booked slots
    const bookings = await OnlineBook.find({ bookingDate: date, status: 'confirmed' });
    const bookedSlots = bookings.map(b => b.slot);

    const availableSlots = slots.filter(slot => !bookedSlots.includes(slot));
    return res.json(availableSlots);

  } catch (err) {
    console.error('Error fetching available slots:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


















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
        const { auth } = req.query;
        

        let booking = await OnlineBook.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (req.body.status === "cancelled") {
            const formattedDate = format(new Date(booking.bookingDate), 'EEEE, MMMM d, yyyy');
            deleteEventFromCalendar(booking?.eventId)
            if (booking.email !== 'N/A') {
                if (auth === 'user') {
                    await sendMail(
                        booking.email,
                        'Booking Cancellation',
                        userCancelMail(req.body.name, formattedDate, req.body.slot, req.body.price, req.body.servicesName)
                    ).catch(err => {
                        console.error("Email sending error (User):", err);
                        return res.status(500).json({ message: "Failed to send user cancellation email", error: err });
                    });

                    await sendMail(
                        process.env.EMAIL_AUTHOR,
                        'Booking Cancellation',
                        adminCancelMail(req.body.name, formattedDate, req.body.slot, req.body.price, req.body.servicesName, "Booking cancelled by user")
                    ).catch(err => {
                        console.error("Email sending error (Admin):", err);
                        return res.status(500).json({ message: "Failed to send admin notification email", error: err });
                    });

                } else if (auth === 'admin') {
                    await sendMail(
                        req.body.email,
                        'Booking Cancellation',
                        cancelMail(req.body.name, formattedDate, req.body.slot, req.body.price, req.body.servicesName)
                    ).catch(err => {
                        console.error("Email sending error (Admin to User):", err);
                        return res.status(500).json({ message: "Failed to send cancellation email to user", error: err });
                    });
                }
            }
        }

      
        booking = await OnlineBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json(booking);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Something went wrong", error });
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