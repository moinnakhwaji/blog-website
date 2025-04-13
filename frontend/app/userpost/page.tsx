"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useUser } from '@clerk/nextjs'
import { ThreeDCardDemo } from '@/components/Card';

const Page = () => {
  const [data, setData] = useState<any>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userpost/${user.id}`);
        setData(response.data.userpost);
        console.log(response.data.userpost);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-gray-300 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Your Blog Posts</h1>

      <div className="px-4 sm:px-6 lg:px-12 py-10">
  <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 max-w-7xl mx-auto">
    {data?.map((items: any, index: number) => (
      <ThreeDCardDemo
        key={items._id || index}
        title={items.title}
        content={items.content}
        author={items.author}
        imageurl={items.imageurl}
        clerkid={items.clerkid}
        mongoid={items._id}
      />
    ))}
  </div>
</div>


      {data?.length === 0 && (
        <p className="text-center text-gray-400 mt-12">You haven't written any posts yet.</p>
      )}
    </div>
  );
};

export default Page;
