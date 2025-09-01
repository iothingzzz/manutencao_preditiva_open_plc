const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  sensorId: String,
  temperature: Number
});

module.exports = mongoose.model('Alert', alertSchema);
