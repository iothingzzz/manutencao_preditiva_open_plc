const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sensorId: String,
  timestamp: { type: Date, default: Date.now },
  temperature: Number,
  alert: Boolean
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
