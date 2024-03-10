import mongoose from 'mongoose';

export const connectionString = "mongodb+srv://admin:admin14@clusterecommerce.bfjaefn.mongodb.net/store?retryWrites=true&w=majority";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};