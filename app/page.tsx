import EditorsPick from "@/components/home/EditorsPick/EditorsPick";
import { FeaturedPost } from "@/components/home/FeaturedPost";
import LatestPosts from "@/components/home/latestPosts/LatestPosts";
import MainCarousel from "@/components/home/mainCarousel/MainCarousel";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between max-w-screen-2xl mx-auto">
      <div className="max-w-screen-2xl mx-auto">
        <MainCarousel />
      </div>
      <LatestPosts />
      <FeaturedPost />
      <EditorsPick />
    </main>
  );
}
