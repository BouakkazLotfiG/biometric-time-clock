import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || '';

const db = mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    return mongoose;
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  });

export default db;
