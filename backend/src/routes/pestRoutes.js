const express = require('express');
const router = express.Router();
const pest = require('../controllers/pestController');

router.post('/identify', pest.identify);
router.get('/database', pest.getDatabase);

module.exports = router;
