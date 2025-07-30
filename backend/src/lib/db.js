import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
     
    });

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log(` MongoDB connected: ${conn.connection.host}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(` MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return conn;
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;