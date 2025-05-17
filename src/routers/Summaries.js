const express = require('express');
const { getMonthlySlotSummaries } = require('../controllers/SummariesController');

const router = express.Router();

router.get('/', getMonthlySlotSummaries);

module.exports = router;
