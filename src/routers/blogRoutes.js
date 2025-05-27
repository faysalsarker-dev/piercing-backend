const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/imagesUpload');

// Import the controller functions
const { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } = require('../controllers/blogController');

// Create a new blog
router.post('/',upload.single('image') , createBlog);

// Get all blogs
router.get('/', getAllBlogs);

// Get a single blog by its slug
router.get('/:slug', getBlogBySlug);

// Update a blog by its slug
router.put('/:slug',upload.single('image'), updateBlog);

// Delete a blog by its slug
router.delete('/:slug', deleteBlog);

module.exports = router;
