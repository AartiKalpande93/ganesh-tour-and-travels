import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
    return true;
  } catch (error) {
    console.warn("MongoDB is not available:", error.message);
    console.warn("Package reads will use the built-in catalog until MongoDB is running.");
    return false;
  }
};

export const isDatabaseReady = () => mongoose.connection.readyState === 1;
