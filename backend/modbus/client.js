const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

async function connectModbus() {
  await client.connectTCP(process.env.MODBUS_HOST, { port: process.env.MODBUS_PORT });
  client.setID(1);
  console.log('Conectado ao ESP32 via Modbus TCP');
}

module.exports = { client, connectModbus };
