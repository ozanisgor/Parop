import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <main className="max-w-screen-2xl mx-auto">
      {/* Header Skeleton */}
      <div className="relative">
        <Skeleton className="2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] w-full bg-secondary" />
        <div className="flex flex-col lg:bottom-20 bottom-10 items-start absolute w-full z-10 md:left-16 left-4 text-primary-foreground gap-4 md:max-w-lg max-w-72">
          <div className="flex flex-wrap gap-2 w-full">
            <Skeleton className="h-4 w-2/12 rounded-lg md:py-1 md:px-3 py-0 px-2" />
            <Skeleton className="h-4 w-2/12 rounded-lg md:py-1 md:px-3 py-0 px-2" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-7/12" />
            <Skeleton className="h-4 w-7/12" />
            <Skeleton className="h-4 w-6/12" />
          </div>
          <Separator className="w-8" />
          <Skeleton className="h-3 w-1/12 mb-4" />
        </div>
      </div>

      {/* Mobile Date/Time Skeleton */}
      <div className="xl:hidden flex justify-center items-center gap-3 lg:mt-20 mt-10">
        <Skeleton className="h-4 w-24 bg-secondary" />
        <Separator className="w-7 bg-secondary" />
        <Skeleton className="h-4 w-20 bg-secondary" />
      </div>

      {/* Content Grid */}
      <div className="grid xl:grid-cols-5 xl:gap-14 lg:gap-12 xl:px-16 px-4">
        {/* Desktop Date/Time Skeleton */}
        <div className="justify-center h-min items-center gap-3 lg:my-40 my-14 col-span-1 hidden xl:flex">
          <Skeleton className="h-4 w-24 bg-secondary" />
          <Separator className="w-7 bg-secondary" />
          <Skeleton className="h-4 w-20 bg-secondary" />
        </div>

        {/* Content Skeleton */}
        <div className="xl:col-span-3 col-span-5 space-y-4 my-14 xl:mt-32 mt-10 w-full xl:col-start-2 col-start-1 mx-auto max-w-xs md:max-w-xl lg:max-w-2xl">
          <Skeleton className="h-8 my-8 w-9/12 bg-secondary" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-full bg-secondary" />
              <Skeleton className="h-4 w-[90%] bg-secondary" />
              <Skeleton className="h-4 w-[95%] bg-secondary" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="mb-10 mx-auto max-w-xs md:max-w-xl lg:max-w-2xl w-full px-4 xl:px-16">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full bg-secondary" />
          ))}
        </div>
      </div>
    </main>
  );
}
