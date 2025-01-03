// components/AboutUs.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16 px-6">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              Embark on Our Exciting Blogging Adventure
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
              At SFAblog, our journey is driven by a passion for crafting insightful, AI-generated content across diverse topics. From technology to lifestyle, we aim to provide engaging and informative blogs that resonate with our readers.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
              <div className="rounded-md shadow">
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mt-10 md:mt-0">
            <Image
              className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
              alt="Shape"
              width={500}
              height={500}
            />
            <Image
              className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src="/images/01020.png"
              alt="AI png"
              width={1080}
              height={720}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
