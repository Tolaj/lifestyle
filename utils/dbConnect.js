// utils/dbConnect.js

import mongoose from "mongoose";

let isConnected = false; // Connection state flag

const dbConnect = async () => {
  if (isConnected) return; // If already connected, do nothing

  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(
      "mongodb://lifestyle:root@cluster0-shard-00-00.zh8lu.mongodb.net:27017,cluster0-shard-00-01.zh8lu.mongodb.net:27017,cluster0-shard-00-02.zh8lu.mongodb.net:27017/?ssl=true&replicaSet=atlas-h16yw1-shard-0&authSource=admin&appName=Cluster0",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        minPoolSize: 1,
        maxPoolSize: 5, // Consider a higher pool size for better performance
      }
    );

    isConnected = true; // Set connection state flag
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DB Error: ${err.message}`);
    process.exit(1); // Exit on error (consider using a more graceful exit)
  }
};

// Export the dbConnect function
export default dbConnect;
