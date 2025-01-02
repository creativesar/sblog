import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 bg-slate-200 w-full h-auto min-h-[500px]">
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left md:pr-16 mb-8 md:mb-0">
        <h1 className="text-black text-[40px] md:text-[64px] lg:text-[80px] font-extrabold font-[Poppins]">Welcome to AI Experience</h1>
        <p className="text-gray-700 mt-4 text-base md:text-lg">Where innovation and intelligence meet. Explore the endless possibilities of AI, designed to enhance your journey, inspire creativity, and transform your tech experience.</p>
        <Link href="/signin">
          <button className="mt-6 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Sign In to Get Started
          </button>
        </Link>
      </div>
      {/* Image Section */}
      <div className="flex-1 w-full md:w-2/3 lg:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 lg:mt-20">
        <Image
          src="/images/airobot.png"
          alt="Hero Image"
          width={3000}
          height={3000}
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
