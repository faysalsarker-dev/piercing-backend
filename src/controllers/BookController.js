const OnlineBook = require('../model/onlineBook');
const  sendMail  = require('../middlewares/sendMail');
const mailTemplate = require('../utility/mailTemplate');
const cron = require('node-cron');
const adminMail = require('../utility/adminMail');
const cancelMail = require('../utility/cancelMail');
const adminCancelMail = require('../utility/adminCancelMail');
const userCancelMail = require('../utility/userCancelMail');


const { subDays, format, startOfDay } = require("date-fns");
// const { addToAdminCalendar, deleteEventFromCalendar } = require('./GoogleCelender');
const DateOverride = require('../model/Override');
const WeeklySchedule = require('../model/Schedule');
const { saveSlotSummary } = require('./SummariesController');
const { createOrUpdateMonthlyReport, updateReportOnStatusChange } = require('../utility/reports/report');

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
     
const booking = new OnlineBook({ ...req.body });
await booking.save();

await saveSlotSummary(booking);
res.status(201).json({ message: "Booking created successfully", booking });
await createOrUpdateMonthlyReport(booking)





    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};


const getAllOnlineBookings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      service,
      bookingDate,
      from,
      to,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;


    // 🔍 Search filter
    const searchRegex = new RegExp(search, 'i');
    const searchFilter = {
      $or: [
        { name: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    };

    // 🧠 Build filter
    const filter = { ...searchFilter };

    if (status) filter.status = status;
    if (service) filter.service = service;
    if (bookingDate) filter.bookingDate = bookingDate;

    if (from || to) {
      filter.bookingDate = {};
      if (from) filter.bookingDate.$gte = from;
      if (to) filter.bookingDate.$lte = to;
    }

    // 🧾 Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // 📄 Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await OnlineBook.countDocuments(filter);
    const bookings = await OnlineBook.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};








const getSlots = async (req, res) =>  {
  const { date } = req.params;
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
        return res.json({ message: override?.message ,isDayOff: true,slot:[] }); 
      }
      slots = override.slots || [];
    } else {
      // Step 2: Fallback to weekly schedule
      const weekly = await WeeklySchedule.findOne({ day: dayName });
      if (!weekly || weekly.isDayOff) {
        return res.json({ message: weekly?.message ,isDayOff: true,slot:[] }); 
      }
      slots = weekly.slots || [];
    }

    // Step 3: Filter out already booked slots
    const bookings = await OnlineBook.find({ bookingDate: date, status: 'confirmed' });
    const bookedSlots = bookings.map(b => b.slot);

    const availableSlots = slots.filter(slot => !bookedSlots.includes(slot));
    return res.json({slots:availableSlots, isDayOff: false});

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

        if (req.body.status === "cancelled" && booking.status === "confirmed") {
           

await updateReportOnStatusChange(booking,req.body.status)

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
    getAllOnlineBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    getSlots,
    getTodaysBookings,
    myBookings,
    
};