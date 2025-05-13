const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const BookingRoutes = require("./src/routers/BookingRoutes");
const ReviewRoutes = require("./src/routers/ReviewRoutes");
const PriceRoutes = require("./src/routers/PriceRoutes");
const weeklyScheduleRoutes = require("./src/routers/weeklyScheduleRoutes");
const OverRideController = require("./src/routers/OverRideController");
const OnlineBook = require('./src/model/onlineBook');
const blogRoutes = require('./src/routers/blogRoutes');

require("dotenv").config();
const path = require("path");
const sendMail = require("./src/middlewares/sendMail");
const contactMail = require("./src/utility/contactMail");
const { default: mongoose } = require("mongoose");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



app.use('/online-booking',BookingRoutes);





app.use('/price',PriceRoutes)

app.use('/blogs', blogRoutes);

app.use('/review',ReviewRoutes)


app.use('/weekly-schedules',weeklyScheduleRoutes );



app.use('/override-schedules',OverRideController );







app.get('/my-bookings', async (req, res) => {
     try {
      let { ids } = req.query;
      if (!ids) {
        return res.status(400).json({ message: 'No booking IDs provided' });
      }
  
      if (typeof ids === 'string') {
        ids = ids.split(',');
      }
  
  
      const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
  
      if (validIds.length === 0) {
        return res.status(400).json({ message: 'No valid booking IDs provided' });
      }
  
      const bookings = await OnlineBook.find({ _id: { $in: validIds } });
  
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: 'Server Error', error });
    }

});



app.post('/send-email', (req, res) => {
  const { email, message, name } = req.body;
 
  sendMail(
     process.env.EMAIL_USER, 
    
    'New Contact Message',
    contactMail(name, email, message) ,
     
)
 
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    });
  res.status(200).json({ message: 'Email sent successfully!' });
});

app.use("/images", express.static(path.resolve(__dirname, "./src/images")));


app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
