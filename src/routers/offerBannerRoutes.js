const express = require('express');
const router = express.Router();

const {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require('../controllers/offerBannerController');
const { upload } = require('../middlewares/imagesUpload');

router.post('/',upload.single('image'), createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id',upload.single('image'), updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
