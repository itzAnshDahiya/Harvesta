const ForumPost = require('../models/ForumPost');

exports.getPosts = async (req, res) => {
  try {
    const filter = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};
    const posts = await ForumPost.find(filter).populate('user', 'name email').populate('comments.user', 'name').sort('-createdAt');
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content required' });
    let post = await ForumPost.create({ user: req.user._id, title, content, category: category || 'General' });
    post = await post.populate('user', 'name email');
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await ForumPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content required' });
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    post.comments.push({ user: req.user._id, content });
    await post.save();
    const updated = await ForumPost.findById(post._id).populate('user', 'name email').populate('comments.user', 'name');
    res.status(201).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found or unauthorized' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
