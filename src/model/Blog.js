const mongoose = require('mongoose');

// Helper to generate unique slug (inline in the model)
const generateUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let count = 1;

  // Check if a blog with the same slug already exists
  while (await Blog.findOne({ slug, _id: { $ne: currentId } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

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
    required: true
  },
  content: {
    type: Object, // Storing Tiptap content as JSON
    required: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
    canonicalUrl: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    ogUrl: String,
    ogType: {
      type: String,
      default: 'article'
    },
    robots: {
      type: String,
      default: 'index, follow'
    }
  }
}, { timestamps: true });

// Pre-save hook to generate a unique slug
blogSchema.pre('save', async function (next) {
  const blog = this;

  // Generate base slug from title
  const baseSlug = blog.slug || blog.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  // Check if the slug is not unique
  blog.slug = await generateUniqueSlug(baseSlug, blog._id);

  next();
});

// Create an index on slug for faster lookups
blogSchema.index({ slug: 1 });

// Export the Blog model
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
