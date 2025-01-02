import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/CustomComponents";
import Comments from "@/components/Comments";

export const revalidate = 60; //seconds

export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug":slug.current
  }`;
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((item: { slug: string }) => item.slug);
  return slugRoutes.map((slug: string) => ({ slug }));
}

// To create static pages for dynamic routes
interface Post {
  title: string;
  summary: string;
  image: string;
  content: any;
  author: {
    bio: string;
    image: string;
    name: string;
  };
}

export default async function page({ params: { slug } }: { params: { slug: string } }) {
  const query = `*[_type=='post' && slug.current=="${slug}"]{
    title,summary,image,content,
      author->{bio,image,name}
  }[0]`;
  const post: Post = await client.fetch(query);

  function urlForImage(image: string): string {
    return image ? urlFor(image).url() : "/placeholder.jpg";
  }

  return (
    <article className="mt-12 mb-24 px-4 lg:px-24 flex flex-col gap-y-12">
      {/* Blog Title */}
      <h1 className="text-3xl lg:text-6xl font-bold text-center text-dark dark:text-light">
        {post.title}
      </h1>

      {/* Featured Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8">
        <Image
          src={urlForImage(post.image)}
          alt={post.title}
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Summary Section */}
      <section className="bg-light dark:bg-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold uppercase text-accentDarkPrimary mb-4">
          Summary
        </h2>
        <p className="text-base leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

      {/* Author Section (Image & Bio) */}
      <section className="flex gap-4 items-center bg-light dark:bg-dark p-6 rounded-lg shadow-lg">
        <Image
          src={urlForImage(post.author.image)}
          width={100}
          height={100}
          alt={post.author.name}
          className="object-cover rounded-full shadow-md"
        />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
          <p className="italic text-sm text-dark/80 dark:text-light/80">
            {post.author.bio}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <section className="prose prose-lg text-dark/80 dark:text-light/80 mt-8">
        <PortableText value={post.content} components={components} />
      </section>

      {/* Comments Section */}
      <section className="mt-12 bg-light dark:bg-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-dark dark:text-light">Comments</h2>
        <Comments />
      </section>
    </article>
  );
}