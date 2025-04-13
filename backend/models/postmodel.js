import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String, // ✅ corrected spelling
      required: true,
    },
    content: {
      type: String, // ✅ corrected spelling
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    clerkid: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ This auto adds `createdAt` and `updatedAt`
  }
);

export const Post = mongoose.model("POST", postSchema);
