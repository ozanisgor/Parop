import { Suspense } from "react";
import CarouselComponent from "./CarouselComponent";
import { log } from "console";

// async function getLatestPosts() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/posts/latest`,
//     {
//       next: {
//         revalidate: 300, // Revalidate every 5 minutes
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   return res.json();
// }
export const dynamic = "force-dynamic";

async function MainCarousel() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/latest?limit=5`,
    {
      // next: { revalidate: 0 },
      cache: "no-store",
    }
  );
  const articles = await data.json();
  // const articles = await getLatestPosts();

  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <CarouselComponent articles={articles} />
      </Suspense>
    </div>
  );
}

export default MainCarousel;
