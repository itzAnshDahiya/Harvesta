const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const inv = require('../controllers/inventoryController');

router.route('/').get(protect, inv.getAll).post(protect, inv.create);
router.route('/:id').put(protect, inv.update).delete(protect, inv.remove);

module.exports = router;
