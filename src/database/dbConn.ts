import { DB } from "constants/envVars";
import mongoose from "mongoose";

export const connectDB = async () => {
  if (!DB) {
    console.log("Couldn't find ENV.");
    const DB = 'mongodb://127.0.0.1:27017/imdb';
  }
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DB);
    console.log('Database connection established.');
  } catch (e) {
    console.log({ error: e.message });
  }
};
