const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Detailed error diagnostics
    if (error.name === 'MongoServerSelectionError') {
      console.error('🔍 Possible causes:');
      console.error('- Internet connection issues');
      console.error('- Incorrect credentials in connection string');
      console.error('- IP not whitelisted in Atlas cluster');
      console.error('- Atlas cluster not running');
    }
    
    // Exit process with failure
    process.exit(1);
  }
};

// MongoDB event listeners
mongoose.connection.on('connected', () => {
  console.log('🚀 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from DB');
});

// Close Mongoose connection when Node process ends
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⛔ Mongoose connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;