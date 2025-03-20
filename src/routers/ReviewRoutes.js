const express = require("express");
const reviewController = require("../controllers/ReviewController");
const { upload } = require("../middlewares/imagesUpload");

const router = express.Router();

// Route to get all reviews
router.get("/", reviewController.getAllReviews);

router.post("/", upload.single("image"), reviewController.createReview);

router.delete("/:id", reviewController.deleteReview);

module.exports = router;
