const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const forumPostSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  category: { type: String, default: 'General' },
  likes:    { type: Number, default: 0 },
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);
