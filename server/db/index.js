const mongoose = require('mongoose');

// Connection string for local MongoDB
const uri = 'mongodb://127.0.0.1:27017/food-ordering';

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true, // Ensures the use of the new URL parser
    useUnifiedTopology: true, // Enables the new server discovery and monitoring engine
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((e) => {
    console.error('Connection error:', e.message);
  });

// Monitor connection events
const db = mongoose.connection;

db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('MongoDB connection is open'));

module.exports = db;
