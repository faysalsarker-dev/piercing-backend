const mongoose = require('mongoose');

const onlineBookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
   
    },
    name: {
        type: String,
        required: true
    },
    servicesName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
  },);

const OnlineBook = mongoose.model('OnlineBook', onlineBookSchema);

module.exports = OnlineBook;