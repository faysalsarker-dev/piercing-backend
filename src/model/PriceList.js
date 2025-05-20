const mongoose = require('mongoose');

const PriceListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    regularPrice: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    category:{
        type: String,
        required: true
    },
    web :{
         type: String,
        enum:['piercingsodermalm','klippsodermalm','both'],
        default: 'both'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PriceList', PriceListSchema);