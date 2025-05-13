const Blog = require('../model/Blog');

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, slug, image, content, seo } = req.body;

    const newBlog = new Blog({
      title,
      slug, // You can pass an empty slug, it'll get generated in the model
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
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
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
    const { title, slug, image, content, seo } = req.body;

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug; // You can pass a custom slug
    blog.image = image || blog.image;
    blog.content = content || blog.content;
    blog.seo = {
      ...blog.seo,
      ...seo,
      title: seo?.title || title || blog.title,
      ogTitle: seo?.ogTitle || title || blog.title,
      ogImage: seo?.ogImage || image || blog.image,
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
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog };
