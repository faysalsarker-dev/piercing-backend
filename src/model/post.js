const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    btn1Text: {
        type: String,
        required: false
    },
    btn1Link: {
        type: String,
        required: false
    },
    btn2Text: {
        type: String,
        required: false
    },
    btn2Link: {
        type: String,
        required: false
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;