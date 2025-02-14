import { Skeleton } from "../ui/skeleton";

export default function AllPostsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-14 gap-y-20">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="rounded-md md:h-72 h-64 w-full max-h-72 bg-secondary-foreground" />
          <Skeleton className="h-2 w-2/12 rounded-lg md:py-1 md:px-3 py-0 px-2 bg-secondary my-2" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-11/12 rounded-lg md:py-1 md:px-3 py-0 px-2 bg-secondary" />
            <Skeleton className="h-4 w-10/12 rounded-lg md:py-1 md:px-3 py-0 px-2 bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
