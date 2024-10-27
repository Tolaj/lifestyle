import mongoose from "mongoose";

let isConnected = false; // Connection state flag

const dbConnect = async () => {
  if (isConnected) return; // If already connected, do nothing

  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(
      "mongodb+srv://swapnil:root@cluster0.zh8lu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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
