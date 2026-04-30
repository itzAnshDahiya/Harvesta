const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const forum = require('../controllers/forumController');

router.route('/').get(protect, forum.getPosts).post(protect, forum.createPost);
router.put('/:id/like', protect, forum.likePost);
router.post('/:id/comments', protect, forum.addComment);
router.delete('/:id', protect, forum.deletePost);

module.exports = router;
