require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/rides');

const app = express();

app.use(cors()); // allows the Vite frontend (different port) to call this API
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
  res.send('CampusRide API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CampusRide API listening on http://localhost:${PORT}`);
});
