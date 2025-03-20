const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;