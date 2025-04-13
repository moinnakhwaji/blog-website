"use client"
import { ThreeDCardDemo } from '@/components/Card'
import axios from "axios"
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data, Setdata] = useState<any>("")

  useEffect(() => {
    FetchallPost()
  }, [])

  const FetchallPost = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getall`)
    const responsedata = response.data
    Setdata(responsedata)
    console.log(responsedata)
  }

  return (
    <div className="flex bg-[#040404] flex-wrap justify-center gap-6 p-4">
      {data?.allpost?.map((items: any, index: number) => (
        <ThreeDCardDemo
          key={items._id || index} // Prefer unique id if available
          title={items.title}
          content={items.content}
          author={items.author}
          imageurl={items.imageurl}
          clerkid={items.clerkid}
          mongoid={items._id}
        />
      ))}
      
    </div>
  )
}

export default Home
