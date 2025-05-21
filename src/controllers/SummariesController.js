const SlotSummary = require('../model/SlotSummary');

const saveSlotSummary = async (booking) => {
  const { bookingDate, slot, _id } = booking;

  const summary = await SlotSummary.findOne({ date: bookingDate });

  const slotEntry = {
    time: slot,
    clientDetails: _id
  };

  if (summary) {
    summary.slots.push(slotEntry);
    await summary.save();
  } else {
    await SlotSummary.create({
      date: bookingDate,
      slots: [slotEntry]
    });
  }
};



const getMonthlySlotSummaries = async (req, res) => {
  try {
    const { date } = req.query; // e.g., '2025-05-17'
    if (!date) return res.status(400).json({ message: "Date is required" });

    const inputDate = new Date(date);
    if (isNaN(inputDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const daysInMonth = new Date(year, inputDate.getMonth() + 1, 0).getDate();

    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${daysInMonth}`;

    const summaries = await SlotSummary.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate({
      path: 'slots.clientDetails',
      select: 'name email phone service slot status'
    });

    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {saveSlotSummary , getMonthlySlotSummaries};
