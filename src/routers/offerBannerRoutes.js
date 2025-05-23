const express = require('express');
const router = express.Router();

const {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require('../controllers/offerBannerController');

router.post('/', createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
