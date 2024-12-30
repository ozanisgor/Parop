import { Suspense } from "react";
import CarouselComponent from "./CarouselComponent";

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

  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <CarouselComponent articles={articles} />
      </Suspense>
    </div>
  );
}

export default MainCarousel;
