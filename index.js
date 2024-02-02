import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.DB_URL);

// Create a mongoose schema
const cryptoSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  saving: String,
});

// Create a mongoose model
const Crypto = mongoose.model('Crypto', cryptoSchema);

// Fetch data from WazirX API and store in the database
const fetchDataAndStore = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const top10Cryptos = Object.values(response.data).slice(0, 10);

    // Clear existing data
    await Crypto.deleteMany({});

    // Store data in the database
    await Crypto.insertMany(top10Cryptos);
    console.log('Data stored in the database');
  } catch (error) {
    console.error('Error fetching and storing data:', error.message);
  }
};

// Fetch and store data on server startup
fetchDataAndStore();

// Express route to get data from the database
app.get('/api/crypto', async (req, res) => {
  try {
    const data = await Crypto.find({}, '-_id -__v').lean();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
