const OfferBanner = require("../model/OfferBanner");
const fs = require("fs");
const path = require("path");

exports.createBanner = async (req, res) => {
  try {
    console.log(req.body, 'bodyuy');
    const imageUrl = req.file ? req.file.filename : null;

    const banner = new OfferBanner({ ...req.body, imageUrl });
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({ message: error.message });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await OfferBanner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await OfferBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = await OfferBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    let imageUrl = banner.imageUrl;
   
    if (req.file) {
      if (imageUrl) {
        const oldImagePath = path.join(__dirname, `../images${imageUrl}`);
        fs.unlink(oldImagePath, (err) => {
        });
      }
      imageUrl = req.file.filename;
    }

    const updatedData = { ...req.body, imageUrl };
    const updatedBanner = await OfferBanner.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await OfferBanner.findByIdAndDelete(req.params.id);
    if (!deletedBanner)
      return res.status(404).json({ message: "Banner not found" });

    if (deletedBanner.imageUrl) {
      const imagePath = path.join(__dirname, "../images", deletedBanner.imageUrl);
      fs.unlink(imagePath, (err) => {
      });
    }

    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
