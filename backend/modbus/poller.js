const { client, connectModbus } = require('./client');
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');
const { checkThreshold } = require('../utils/thresholds');

async function pollSensor() {
  try {
    await connectModbus();
    setInterval(async () => {
      const data = await client.readInputRegisters(0, 1);
      const temperature = data.data[0] / 10;

      const alert = checkThreshold(temperature);
      await SensorData.create({ sensorId: 'esp32', temperature, alert });

      if (alert) {
        await Alert.create({
          message: 'Temperatura crítica detectada',
          sensorId: 'esp32',
          temperature
        });
        console.log('⚠️ Alerta gerado:', temperature);
      }
    }, 5000);
  } catch (err) {
    console.error('Erro na leitura Modbus:', err);
  }
}

module.exports = pollSensor;
