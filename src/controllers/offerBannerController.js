const OfferBanner = require('../model/OfferBanner');

exports.createBanner = async (req, res) => {
  try {
    const banner = new OfferBanner(req.body);
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
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
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const updatedBanner = await OfferBanner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBanner) return res.status(404).json({ message: 'Banner not found' });
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await OfferBanner.findByIdAndDelete(req.params.id);
    if (!deletedBanner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
