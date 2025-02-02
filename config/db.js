const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/foodiebaba');
  } catch (err) {
    console.error('Error during MongoDB connection:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
