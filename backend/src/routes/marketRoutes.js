const express = require('express');
const router = express.Router();
const market = require('../controllers/marketController');

router.get('/', market.getPrices);
router.get('/:commodityId/history', market.getHistory);

module.exports = router;
