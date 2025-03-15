const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/PostController');
const {upload} = require('../middlewares/imagesUpload')
const router = express.Router();


router.post('/',upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id',upload.single('image'), updatePost);
router.delete('/:id', deletePost);


module.exports = router;