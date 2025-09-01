const SensorData = require('../models/SensorData');

exports.getLatest = async (req, res) => {
  const data = await SensorData.find().sort({ timestamp: -1 }).limit(1);
  res.json(data[0]);
};
