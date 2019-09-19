const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    brief: String,
    message: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;