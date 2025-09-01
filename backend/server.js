require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');

const sensorRoutes = require('./routes/sensorRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sensors', sensorRoutes);
app.use('/api/alerts', alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
