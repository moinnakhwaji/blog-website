"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

interface Card {
  title: string;
  content: string;
  author: string;
  imageurl: string;
  clerkid: string;
  mongoid:string
}

export function ThreeDCardDemo({ title, content, author, imageurl, clerkid,mongoid }: Card) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card bg-[#1f1e24] border border-[#2a2a2a] hover:shadow-xl hover:shadow-[#6556cd]/20 w-auto sm:w-[30rem] h-auto rounded-2xl p-6 transition-all duration-300">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-[#e5e5e5]"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm text-gray-400 max-w-sm mt-2"
        >
          {author}
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
        <Image
  src={imageurl}
  height={1000}
  width={1000}
  unoptimized // 👈 this is the fix for base64 images
  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
  alt="thumbnail"
/>

        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <Link href={`/userpost/${mongoid}`}>
          {/* yaha karna hai  */}
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#6556cd] hover:text-white hover:bg-[#6556cd]/20 transition"
            >
              See →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
