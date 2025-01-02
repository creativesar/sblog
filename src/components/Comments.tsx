'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Comment {
  name: string;
  email: string;
  comment: string;
  image: string;
}

const userImages = [
  "https://pagedone.io/asset/uploads/1710225753.png",
  "https://pagedone.io/asset/uploads/1710238051.png",
  "https://pagedone.io/asset/uploads/1710237485.png",
  "https://pagedone.io/asset/uploads/1710231234.png",
  "https://pagedone.io/asset/uploads/1710235678.png"
];

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = { name, email, comment, image: userImages[imageIndex] };
    setComments([...comments, newComment]);
    setName('');
    setEmail('');
    setComment('');
    setImageIndex((imageIndex + 1) % userImages.length);
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex flex-col gap-7 lg:gap-14">
          <h2 className="text-gray-900 text-4xl font-bold font-manrope">Comments</h2>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 bg-white p-6 rounded-lg shadow-md"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-5 bg-black text-white rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Submit
            </button>
          </form>

          <div className="w-full flex flex-col gap-8">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="w-full p-5 lg:p-8 bg-white rounded-3xl border border-gray-200 shadow-md flex flex-col gap-3.5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                    <Image
                      src={comment.image}
                      alt={`${comment.name}'s profile picture`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-gray-900 text-sm font-semibold">{comment.name}</h5>
                    <h6 className="text-gray-500 text-xs">{comment.email}</h6>
                  </div>
                </div>
                <p className="text-gray-800 text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
