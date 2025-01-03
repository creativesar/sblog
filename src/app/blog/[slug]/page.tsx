import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { components } from "@/components/CustomComponents";
import Comments from "@/components/Comments";

export const revalidate = 60; // seconds

// Fetch slugs for static paths generation
export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug":slug.current
  }`;
  const slugs: { slug: string }[] = await client.fetch(query);
  const slugRoutes = slugs.map((item) => item.slug);
  return slugRoutes.map((slug) => ({ slug }));
}

// Define Post interface for strong typing
interface Post {
  title: string;
  summary: string;
  image?: string;
  content: PortableTextBlock[];
  author: {
    bio?: string;
    image?: string;
    name: string;
  };
}

export default async function page({ params: { slug } }: { params: { slug: string } }) {
  // Fetch the post based on the slug
  const query = `*[_type=='post' && slug.current=="${slug}"]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;
  const post: Post | null = await client.fetch<Post | null>(query);

  if (!post) {
    return <div className="text-center mt-12">Post not found.</div>;
  }

  // Helper function to resolve image URLs
  function urlForImage(image?: string): string {
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
          {post.summary || "No summary available."}
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
            {post.author.bio || "No bio available."}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <section className="prose prose-lg text-dark/80 dark:text-light/80 mt-8">
        {post.content ? (
          <PortableText value={post.content} components={components} />
        ) : (
          <p>No content available.</p>
        )}
      </section>

      {/* Comments Section */}
      <section className="mt-12 bg-light dark:bg-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-dark dark:text-light">Comments</h2>
        <Comments />
      </section>
    </article>
  );
}
