const Override = require('../model/Override');

// CREATE a new weekly OverRide
const createOverRide = async (req, res) => {
  try {
    const { date, slots, isDayOff } = req.body;
    
    // Check if the date already exists
    const existingOverRide = await Override.findOne({ date });
    if (existingOverRide) {
      return res.status(400).json({ error: 'OverRide for this date already exists' });
    }

    const OverRide = new Override({ date, slots, isDayOff });
    await OverRide.save();

    res.status(201).json(OverRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating OverRide' });
  }
};

// READ all OverRides
const getAllOverRides = async (req, res) => {
  try {
    const OverRides = await Override.find();
    res.status(200).json(OverRides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching OverRides' });
  }
};

// READ a specific OverRide by date
const getOverRideBydate = async (req, res) => {
  try {
    const { date } = req.params;
    const OverRide = await Override.findOne({ date });

    if (!OverRide) {
      return res.status(404).json({ error: 'OverRide not found' });
    }

    res.status(200).json(OverRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching OverRide' });
  }
};

// UPDATE a OverRide by date
const updateOverRide = async (req, res) => {
  try {
    const { date } = req.params;
    const { slots, isDayOff } = req.body;

    const updatedOverRide = await Override.findOneAndUpdate(
      { date },
      { slots, isDayOff },
      { new: true }
    );

    if (!updatedOverRide) {
      return res.status(404).json({ error: 'OverRide not found' });
    }

    res.status(200).json(updatedOverRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating OverRide' });
  }
};

// DELETE a OverRide by date
const deleteOverRide = async (req, res) => {
  try {
    const { date } = req.params;
    const deletedOverRide = await Override.findOneAndDelete({ date });

    if (!deletedOverRide) {
      return res.status(404).json({ error: 'OverRide not found' });
    }

    res.status(200).json({ message: 'OverRide deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting OverRide' });
  }
};

module.exports = {
  createOverRide,
  getAllOverRides,
  getOverRideBydate,
  updateOverRide,
  deleteOverRide,
};
