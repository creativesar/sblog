import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // seconds

export default async function BlogMain() {
  // Query to fetch posts from Sanity
  const query = `*[_type=='post'] | order(_createdAt asc){
    summary, 
    title, 
    image, 
    content, 
    author->{
      bio, 
      image, 
      name
    },
    "slug": slug.current
  }`;

  // Define the Post interface for TypeScript
  interface Post {
    summary: string;
    title: string;
    image: string;
    content: string;
    author: {
      bio: string;
      image: string;
      name: string;
    };
    slug: string;
  }

  // Fetch posts from Sanity and type the response
  const posts: Post[] = await client.fetch<Post[]>(query);

  // Return the main component
  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-dark dark:text-light sm:text-3xl lg:text-5xl">
        Most Recent Blogs
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </section>
    </main>
  );
}
