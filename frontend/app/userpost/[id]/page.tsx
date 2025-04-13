"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface BlogPost {
  title: string;
  content: string;
  imageurl: string;
  author?: string;
}

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<BlogPost | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState<BlogPost>({
    title: "",
    content: "",
    imageurl: "",
  });

  const postId = params?.id as string;
  const user = { id: "user123" }; // Dummy user

  const fetchSingleData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/singlepost/${postId}`);
      setData(response.data.post);
      setUpdatedData({
        title: response.data.post.title,
        content: response.data.post.content,
        imageurl: response.data.post.imageurl,
      });
    } catch (error) {
      console.error("Error fetching single post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete/${postId}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update/${postId}`, {
        clerkid: user.id,
        ...updatedData,
      });

      console.log("Updated:", response.data);
      setEditMode(false);
      fetchSingleData(); // Refresh the data
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchSingleData();
  }, [postId]);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-[#1f1e24]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f1e24] text-gray-100 px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full bg-[#2c2b31] rounded-2xl shadow-lg p-6 space-y-4">
        <Image
          src={data.imageurl}
          height={500}
          width={1000}
          unoptimized
          className="w-full object-cover rounded-xl"
          alt="thumbnail"
        />

        {editMode ? (
          <>
            <input
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Title"
            />
            <textarea
              value={updatedData.content}
              onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Content"
            />
            <input
              type="text"
              value={updatedData.imageurl}
              onChange={(e) => setUpdatedData({ ...updatedData, imageurl: e.target.value })}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Image URL"
            />

            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white">{data.title}</h1>
            <p className="text-sm text-gray-400">Author: {data.author || "Unknown"}</p>
            <div className="max-h-[500px] overflow-y-auto">
              <p className="text-lg text-gray-200 leading-relaxed">{data.content}</p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete Post
              </button>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Edit Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
