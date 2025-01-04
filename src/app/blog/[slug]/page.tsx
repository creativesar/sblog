import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Comments from "@/components/Comments";

// Add this function to fetch all slugs and pass them to the static generation
// export async function generateStaticParams() {
//   const query = `*[_type=='post']{
//     "slug":slug.current
//   }`;
//   const slugs = await client.fetch(query);
//   const slugRoutes = slugs.map((item:{slug:string})=>(
//     item.slug
//   ));
//   // console.log(slugRoutes)
//   return slugRoutes.map((slug:string)=>(
//     {slug}
//   ))
  
// }

// Your page component that fetches the post data
export default async function PostPage({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  
  const query = `*[_type == 'post' && slug.current == $slug]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;

  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div className="text-center text-gray-500">Sorry, the requested post could not be found.</div>;
  }

  console.log("Image",post.image);
  

  return (
    <article className="mt-16 mb-32 px-4 sm:px-8 lg:px-16 flex flex-col gap-y-12">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-dark dark:text-light text-center">
        {post.title}
      </h1>
      <div className="relative w-full h-72 sm:h-96 lg:h-[500px] mb-12 shadow-md rounded-lg overflow-hidden">
        {post.image.asset && (
          <Image
          src={urlFor(post.image.asset).url()}
          fill
          objectFit="cover"
          alt={post.title}
          className="hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        )}
      </div>
      <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-accentDarkPrimary mb-4">Summary</h2>
        <p className="text-lg leading-relaxed text-justify text-dark/80 dark:text-light/80">{post.summary}</p>
      </section>
      <section className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
        {post.author.image.asset && (
          <Image
          src={post.author.image ? urlFor(post.author.image.asset).url() : "/default-author.jpg"}
          width={80}
          height={80}
          alt={post.author.name}
          className="object-cover rounded-full border-4 border-accentDarkPrimary"
        />
        )}
        <div>
          <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
          <p className="italic text-sm text-dark/70 dark:text-light/70">{post.author.bio}</p>
        </div>
      </section>
      <section className="prose prose-lg prose-accentDarkPrimary max-w-none text-dark dark:text-light">
        <PortableText value={post.content} />
      </section>
      <section className="mt-12">
        <Comments />
      </section>
    </article>
  );
}
