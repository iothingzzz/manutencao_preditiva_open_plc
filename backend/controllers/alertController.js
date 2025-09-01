const Alert = require('../models/Alert');

exports.getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
  res.json(alerts);
};
