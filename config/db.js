const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://admin123:admin123@b546.gr3yscd.mongodb.net/movieList-API?retryWrites=true&w=majority&appName=b546';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
