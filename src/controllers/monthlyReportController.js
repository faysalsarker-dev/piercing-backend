const MonthlyReport = require('../model/MonthlyReport');

// Get all monthly reports
const getAllReports = async (req, res) => {
  try {
    const reports = await MonthlyReport.find().sort({ month: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
  }
};

// Get single report by month (e.g., 2025-05)
const getReportByMonth = async (req, res) => {
  const { month } = req.params;
  try {
    const report = await MonthlyReport.findOne({ month });
    if (!report) {
      return res.status(404).json({ message: 'Report not found for this month' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report', error: error.message });
  }
};

// Update a report manually (only if needed)
const updateReport = async (req, res) => {
  const { month } = req.params;
  try {
    const updatedReport = await MonthlyReport.findOneAndUpdate(
      { month },
      { $set: req.body },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found to update' });
    }
    res.json({ message: 'Report updated successfully', updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update report', error: error.message });
  }
};

// Delete a monthly report (only if needed)
const deleteReport = async (req, res) => {
  const { month } = req.params;
  try {
    const deleted = await MonthlyReport.findOneAndDelete({ month });
    if (!deleted) {
      return res.status(404).json({ message: 'Report not found to delete' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete report', error: error.message });
  }
};

module.exports = {
  getAllReports,
  getReportByMonth,
  updateReport,
  deleteReport,
};
