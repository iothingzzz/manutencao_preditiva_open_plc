function checkThreshold(temp) {
  return temp > parseFloat(process.env.TEMP_LIMIT);
}

module.exports = { checkThreshold };
