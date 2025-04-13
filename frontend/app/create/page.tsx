"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'; // add this

const Create = () => {
  const { user } = useUser();
  const router = useRouter(); // add this 
  const [formdata, setFormdata] = useState({
    title: "",
    content: "",
    imageurl: "",
    author: "",
    clerkid: "",
  });

  const [error, setError] = useState("");

  // Update author and clerkid when user loads
  useEffect(() => {
    if (user) {
      setFormdata((prev) => ({
        ...prev,
        author: user.fullName || "",
        clerkid: user.id || "",
      }));
    }
  }, [user]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, content, imageurl, author, clerkid } = formdata;

    if (!title || !content || !imageurl || !author || !clerkid) {
      setError("Please fill all fields in the form");
      return;
    }

    try {
      const response = await axios.post(
        `process.env.${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create`,
        formdata
      );
      console.log("Submitted:", formdata);
      console.log("Server Response:", response.data);
      

      // Clear form
      setFormdata({
        title: "",
        content: "",
        imageurl: "",
        author: user?.fullName || "",
        clerkid: user?.id || "",
      });
      setError("");
      router.push("/")
     
    } catch (error) {
      console.error("Submission Error:", error);
      setError("Something went wrong while submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
      <div className="bg-zinc-950 p-6 rounded-xl shadow-lg w-full max-w-md">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#6556cd]">Create Post</h1>
            <h4 className="text-sm text-gray-400">
              Share your thoughts with a new post
            </h4>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              id="title"
              onChange={changeHandler}
              placeholder="Enter title"
              className="w-full px-3 py-2 rounded-md bg-[#2a2933] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="content" className="block text-sm text-gray-300">
              Content
            </label>
            <input
              type="text"
              name="content"
              value={formdata.content}
              id="content"
              onChange={changeHandler}
              placeholder="Write something..."
              className="w-full px-3 py-2 rounded-md bg-[#2a2933] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="imageurl" className="block text-sm text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="imageurl"
              value={formdata.imageurl}
              id="imageurl"
              onChange={changeHandler}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 rounded-md bg-[#2a2933] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 w-full text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md transition"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
