const MonthlyReport = require('../../model/MonthlyReport');

const createOrUpdateMonthlyReport = async (booking) => {
  try {
    const { bookingDate, service, status, price } = booking;

    const month = bookingDate.slice(0, 7); 

    let report = await MonthlyReport.findOne({ month });

    if (!report) {
      report = new MonthlyReport({
        month,
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        revenue: 0,
        topServices: [],
      });
    }

    report.totalBookings += 1;

    if (status === 'confirmed') {
      report.confirmedBookings += 1;
      report.revenue += price;
    } else if (status === 'cancelled') {
      report.cancelledBookings += 1;
    }

    const existingService = report.topServices.find((s) => s.name === service);
    if (existingService) {
      existingService.count += 1;
      existingService.revenue += price;

    } else {
      report.topServices.push({ name: service, count: 1, revenue:price });
    }

    await report.save();
  } catch (error) {
    console.error('Failed to update monthly report:', error.message);
  }
};



const updateReportOnStatusChange = async (booking,newStatus) => {
  try {
    const { bookingDate, price, status } = booking;

    const month = bookingDate.slice(0, 7);
    const report = await MonthlyReport.findOne({ month });
    if (!report) return;

    if (status === "confirmed" && newStatus === "cancelled") {
      report.cancelledBookings += 1;
      report.confirmedBookings -= 1;
      report.revenue -= price;
    } 



    await report.save();
  } catch (error) {
    console.error('Error in updateReportOnStatusChange:', error.message);
  }
};



module.exports = {createOrUpdateMonthlyReport , updateReportOnStatusChange};
