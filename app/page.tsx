import Blog from "@/components/blog";
import GetButton from "@/components/GetButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Blog />
      {/* <GetButton /> */}
    </main>
  );
}
