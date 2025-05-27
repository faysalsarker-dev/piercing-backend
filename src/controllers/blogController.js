const Blog = require('../model/Blog');
const fs = require('fs');
const path = require('path');

const uploadPath = path.resolve(__dirname, '../images/');

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, slug, content, seo } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const newBlog = new Blog({
      title,
      slug,
      image,
      content,
      seo
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  const { web } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    let filter = {};

    if (web) {
      filter = {
        $or: [
          { web: web },
          { web: 'both' },
        ],
      };
    }

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalBlogs,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get Blog by Slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { title, slug, content, seo } = req.body;

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (blog.image) {
        const oldImagePath = path.join(uploadPath, path.basename(blog.image));
        fs.access(oldImagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(oldImagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error('Error deleting old image:', unlinkErr);
              }
            });
          }
        });
      }
      blog.image = req.file.filename;
    }

    // Update other fields
    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.content = content || blog.content;
    blog.seo = {
      ...blog.seo,
      ...seo,
      title: seo?.title || title || blog.title,
      ogTitle: seo?.ogTitle || title || blog.title,
      ogImage: seo?.ogImage || blog.image,
      ogUrl: seo?.ogUrl || slug || blog.slug,
    };

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Delete image file if it exists
    if (blog.image) {
      const filePath = path.join(uploadPath, path.basename(blog.image));
      console.log(filePath);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting image:', unlinkErr);
            }
          });
        }
      });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog };
