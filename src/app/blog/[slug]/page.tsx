import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Comments from "@/components/Comments";

// Revalidate data every 60 seconds (ISR)
export const revalidate = 60;

// Define types for fetched data
interface Author {
  bio: string;
  image: string;
  name: string;
}

interface Post {
  title: string;
  summary: string;
  image: string;
  content: PortableTextBlock[];
  author: Author;
}

interface PostSlug {
  slug: {
    current: string;
  };
}

// Function to generate static parameters
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)]{ slug }`;
  try {
    const slugs: PostSlug[] = await client.fetch(query);

    if (!slugs || slugs.length === 0) {
      throw new Error("No valid slugs found for posts.");
    }

    return slugs.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

// Function to generate metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
) {
  const query = `*[_type == 'post' && slug.current == $slug]{
    title, summary as description, image
  }[0]`;

  try {
    const post = await client.fetch(query, { slug: params.slug });
    if (!post) return {};

    const ogImage = post.image ? urlFor(post.image).url() : undefined;

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

// Main page component
export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const query = `*[_type == 'post' && slug.current == $slug]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;

  try {
    const post: Post | null = await client.fetch(query, { slug });

    if (!post) {
      return (
        <div className="text-center text-gray-500">
          Sorry, the requested post could not be found.
        </div>
      );
    }

    return (
      <article className="mt-16 mb-32 px-4 sm:px-8 lg:px-16 flex flex-col gap-y-12">
        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-dark dark:text-light text-center">
          {post.title}
        </h1>

        {/* Featured Image */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[500px] mb-12 shadow-md rounded-lg overflow-hidden">
          <Image
            src={post.image ? urlFor(post.image).url() : "/fallback-image.jpg"}
            layout="fill"
            objectFit="cover"
            alt={post.title}
            className="hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Blog Summary Section */}
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-accentDarkPrimary mb-4">
            Summary
          </h2>
          <p className="text-lg leading-relaxed text-justify text-dark/80 dark:text-light/80">
            {post.summary}
          </p>
        </section>

        {/* Author Section */}
        <section className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
          <Image
            src={post.author.image ? urlFor(post.author.image).url() : "/default-author.jpg"}
            width={80}
            height={80}
            alt={post.author.name}
            className="object-cover rounded-full border-4 border-accentDarkPrimary"
          />
          <div>
            <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
            <p className="italic text-sm text-dark/70 dark:text-light/70">{post.author.bio}</p>
          </div>
        </section>

        {/* Main Body of Blog */}
        <section className="prose prose-lg prose-accentDarkPrimary max-w-none text-dark dark:text-light">
          <PortableText value={post.content} />
        </section>

        {/* Comments Section */}
        <section className="mt-12">
          <Comments />
        </section>
      </article>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="text-center text-gray-500">
        Something went wrong. Please try again later.
      </div>
    );
  }
}
