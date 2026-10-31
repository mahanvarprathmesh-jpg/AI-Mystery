import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) {
    console.warn('MONGODB_URI is not configured; starting without database access.');
    return false;
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.info('Connected to MongoDB.');
  return true;
}
