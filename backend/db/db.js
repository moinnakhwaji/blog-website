import mongoose from "mongoose";

export const db = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/newone";
    await mongoose.connect(uri, {
      
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Optional: Stop the app if DB doesn't connect
  }
};
