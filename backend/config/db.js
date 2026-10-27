const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_book';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if Atlas is unreachable
    });

    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.log('[Notice] If using MongoDB Atlas, verify IP whitelist (0.0.0.0/0) and credentials in .env');
    console.log('[Notice] If testing locally, ensure MongoDB service is running on 127.0.0.1:27017');
    // We don't exit process immediately so server can still serve health check or informative responses
  }
};

module.exports = connectDB;
