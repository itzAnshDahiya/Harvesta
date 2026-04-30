const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getPosts = (req, res) => {
  try {
    const { category } = req.query;
    let posts;
    if (category && category !== 'All') {
      posts = db.prepare('SELECT fp.*, u.name as user_name, u.email as user_email FROM forum_posts fp JOIN users u ON fp.user_id = u.id WHERE fp.category = ? ORDER BY fp.created_at DESC').all(category);
    } else {
      posts = db.prepare('SELECT fp.*, u.name as user_name, u.email as user_email FROM forum_posts fp JOIN users u ON fp.user_id = u.id ORDER BY fp.created_at DESC').all();
    }
    const getComments = db.prepare('SELECT fc.*, u.name as user_name FROM forum_comments fc JOIN users u ON fc.user_id = u.id WHERE fc.post_id = ? ORDER BY fc.created_at ASC');
    const result = posts.map((p) => ({
      ...p,
      user: { id: p.user_id, name: p.user_name, email: p.user_email },
      comments: getComments.all(p.id).map((c) => ({ ...c, user: { id: c.user_id, name: c.user_name } })),
    }));
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content are required' });
    const id = uuidv4();
    db.prepare('INSERT INTO forum_posts (id, user_id, title, content, category) VALUES (?, ?, ?, ?, ?)').run(id, req.user.id, title, content, category || 'General');
    const post = db.prepare('SELECT fp.*, u.name as user_name, u.email as user_email FROM forum_posts fp JOIN users u ON fp.user_id = u.id WHERE fp.id = ?').get(id);
    res.status(201).json({ success: true, data: { ...post, user: { id: post.user_id, name: post.user_name, email: post.user_email }, comments: [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likePost = (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('UPDATE forum_posts SET likes = likes + 1 WHERE id = ?').run(id);
    const post = db.prepare('SELECT * FROM forum_posts WHERE id = ?').get(id);
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addComment = (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required' });
    const commentId = uuidv4();
    db.prepare('INSERT INTO forum_comments (id, post_id, user_id, content) VALUES (?, ?, ?, ?)').run(commentId, id, req.user.id, content);
    const comment = db.prepare('SELECT fc.*, u.name as user_name FROM forum_comments fc JOIN users u ON fc.user_id = u.id WHERE fc.id = ?').get(commentId);
    res.status(201).json({ success: true, data: { ...comment, user: { id: comment.user_id, name: comment.user_name } } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePost = (req, res) => {
  try {
    const { id } = req.params;
    const post = db.prepare('SELECT * FROM forum_posts WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found or unauthorized' });
    db.prepare('DELETE FROM forum_posts WHERE id = ?').run(id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
