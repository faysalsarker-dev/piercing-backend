const WeeklySchedule = require('../model/Schedule');

// CREATE a new weekly schedule
const createSchedule = async (req, res) => {
  try {
    const { day, slots, isDayOff } = req.body;
    
    // Check if the day already exists
    const existingSchedule = await WeeklySchedule.findOne({ day });
    if (existingSchedule) {
      return res.status(400).json({ error: 'Schedule for this day already exists' });
    }

    const schedule = new WeeklySchedule({ day, slots, isDayOff });
    await schedule.save();

    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating schedule' });
  }
};

// READ all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await WeeklySchedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching schedules' });
  }
};

// READ a specific schedule by day
const getScheduleByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const schedule = await WeeklySchedule.findOne({ day });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching schedule' });
  }
};

// UPDATE a schedule by day
const updateSchedule = async (req, res) => {
  try {
    const { day } = req.params;
    const { slots, isDayOff } = req.body;

    const updatedSchedule = await WeeklySchedule.findOneAndUpdate(
      { day },
      { slots, isDayOff },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating schedule' });
  }
};

// DELETE a schedule by day
const deleteSchedule = async (req, res) => {
  try {
    const { day } = req.params;
    const deletedSchedule = await WeeklySchedule.findOneAndDelete({ day });

    if (!deletedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting schedule' });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleByDay,
  updateSchedule,
  deleteSchedule,
};
