const Post = require('../model/post');
const path = require('path');
const fs = require('fs');
// Create a new post
const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

       
        const updatedData = {
            ...req.body,
            image: req.file ? `${req.file.filename}` : existingPost.image 
        };

     
        if (req.file) {
            // If there's an existing image, delete it before updating
            if (existingPost.image) {
                const oldImagePath = path.join(__dirname, '../images', existingPost.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);  // Delete the old image
                    console.log("Old image deleted:", oldImagePath);
                }
            }
        }

        const post = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });

        res.status(200).json(post); 
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};