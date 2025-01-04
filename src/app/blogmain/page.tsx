import { client } from "@/sanity/lib/client";
import BlogCard from "@/components/BlogCard";

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

export default async function BlogMain() {
  // Fetching data directly within the component (server-side)
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

  const posts: Post[] = await client.fetch(query);

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
