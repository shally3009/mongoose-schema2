const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Comment schema
const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Blog Post schema
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Title must be at least 5 characters long'],
  },
  content: {
    type: String,
    required: true,
    minlength: [50, 'Content must be at least 50 characters long'],
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: 'General',
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],  // Embed the comment schema as an array of subdocuments
});

// Middleware to update the `updatedAt` field when content or title changes
blogPostSchema.pre('save', function(next) {
  if (this.isModified('content') || this.isModified('title')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Create a model for BlogPost
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Create a model for Comment (optional, since comments are embedded in the blog post)
const Comment = mongoose.model('Comment', commentSchema);

// Export the models
module.exports = { BlogPost, Comment };