import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Start MongoDB first: npm run db:start (from the backend folder)");
    process.exit(1);
  }
};
