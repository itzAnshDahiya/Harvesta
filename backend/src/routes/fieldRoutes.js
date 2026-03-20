const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, fieldController.getFieldsByUser)
  .post(protect, fieldController.createField);

module.exports = router;
