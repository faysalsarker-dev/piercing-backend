const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
content: { type: Schema.Types.Mixed ,required: true},
  web: {
    type: String,
    enum: ['klippsodermalm', 'piercingsodermalm', 'both'],
    default: 'both'
  },
seo: {
  title: String,
  description: String,
  keywords: [String],
  ogType: { type: String, default: 'article' },
  robots: { type: String, default: 'index, follow' }
}

}, { timestamps: true });

// Unique slug generator
const generateUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let count = 1;
  while (await Blog.findOne({ slug, _id: { $ne: currentId } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
};

// Pre-save hook to ensure unique slug
blogSchema.pre('save', async function (next) {
  const blog = this;
  const baseSlug = blog.slug || blog.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  blog.slug = await generateUniqueSlug(baseSlug, blog._id);
  next();
});

// Index for faster slug lookups
blogSchema.index({ slug: 1 });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
