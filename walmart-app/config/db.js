const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI;

const connectionDB = async () => {
  try {
    const data = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    return data;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Optional: exit the app if DB fails to connect
  }
};

module.exports = connectionDB;
