const mongoose = require('mongoose');

const onlineBookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
   
    },
    name: {
        type: String,
        required: false
    },
    servicesName: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    bookingDate: {
        type: String,
        required: false
    },
    slot: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: "confirmed"
    },
},
{
    timestamps: true,
  },);

const OnlineBook = mongoose.model('OnlineBook', onlineBookSchema);

module.exports = OnlineBook;