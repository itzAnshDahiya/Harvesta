const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const fieldController = require('../controllers/fieldController');

router.route('/').get(protect, fieldController.getFieldsByUser).post(protect, fieldController.createField);
router.delete('/:id', protect, fieldController.deleteField);
router.post('/:fieldId/crops', protect, fieldController.addCrop);

module.exports = router;
