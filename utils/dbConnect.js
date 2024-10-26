import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    
    const conn = await mongoose.connect(
      "mongodb+srv://swapnil:root@cluster0.zh8lu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useUnifiedTopology: true,
       
        minPoolSize:1,
        maxPoolSize:1, 
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DB Error: ${err.message}`);
    process.exit(1);
  } finally{
    setTimeout(async () => {
      if (mongoose.connection.readyState === 1) {  
        console.log('MongoDB is still connected. Disconnecting...');
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
      } else {
        console.log('MongoDB was already disconnected.');
      }
    }, 10000);
  }
};

export default dbConnect;