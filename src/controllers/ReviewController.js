const Review = require('../model/Review'); // Assuming you have a Review model
const path = require('path');
const fs = require('fs');







const getAllReviews = async (req, res) => {
    try {

        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    const data = {
        ...req.body,
        image: req.file ? `${req.file.filename}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' 
    };
    const newReview = new Review(data);

    try {
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
      
        if (deletedReview.image) {
            const oldImagePath = path.join(__dirname, '../images', deletedReview.image);

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); 
                console.log("Old image deleted:", oldImagePath);
            }
        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllReviews,
    createReview,
    deleteReview
};
