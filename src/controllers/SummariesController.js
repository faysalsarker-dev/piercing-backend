const SlotSummary = require('../model/SlotSummary');

const saveSlotSummary = async (booking) => {
  const { bookingDate, slot, name, email, phone } = booking;

  const summary = await SlotSummary.findOne({ date: bookingDate });

  const slotEntry = {
    time: slot,
    user: { name, email, phone }
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
    const { month } = req.query; 
    console.log(month);
    if (!month) return res.status(400).json({ message: "Month is required" });

    const startDate = `${month}-01`;
    const endDate = `${month}-31`;

    const summaries = await SlotSummary.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {saveSlotSummary , getMonthlySlotSummaries};
