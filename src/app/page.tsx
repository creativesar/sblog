import Hero from "@/components/Hero";
import BlogMain from "@/app/blogmain/page"; // Correct import path

export default function Home() {
  return (
    <div>
      <Hero />
      <BlogMain />
    </div>
  );
}
