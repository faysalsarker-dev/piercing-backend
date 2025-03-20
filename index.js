const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const BookingRoutes = require("./src/routers/BookingRoutes");
const PostRoutes = require("./src/routers/PostRoutes");
const ReviewRoutes = require("./src/routers/ReviewRoutes");
const PriceRoutes = require("./src/routers/PriceRoutes");

require("dotenv").config();
const path = require("path");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



app.use('/online-booking',BookingRoutes);


app.use('/post',PostRoutes)



app.use('/price',PriceRoutes)



app.use('/review',ReviewRoutes)




app.use("/images", express.static(path.resolve(__dirname, "./src/images")));


app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
