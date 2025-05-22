const express = require('express');
const { getMonthlySlotSummaries } = require('../controllers/SummariesController');
const { getMonthlyDashboardSummary } = require('../controllers/monthlyReportController');

const router = express.Router();

router.get('/', getMonthlySlotSummaries);
router.get('/monthly-summary', getMonthlyDashboardSummary);

module.exports = router;
