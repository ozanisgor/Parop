"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function AllPostsPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination className="mt-12 mb-20 md:mt-16 md:mb-24 text-primary">
      <PaginationContent className="inline-flex">
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={cn(
              "py-2 md:px-3 px-2 hover:bg-secondary-foreground hover:text-primary-foreground",
              currentPage <= 1 && "hidden"
            )}
          />
        </PaginationItem>

        <PaginationItem className="flex gap-0.5">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;
            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationLink
                key={index}
                href={createPageURL(page)}
                isActive={currentPage === page}
                className={cn(
                  "text-xs md:text-sm hover:bg-secondary-foreground hover:text-primary-foreground h-7 w-7 md:h-10 md:w-10",
                  position === "middle" && "pointer-events-none"
                )}
              >
                {page}
              </PaginationLink>
            );
          })}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={cn(
              "py-2 md:px-3 px-2 hover:bg-secondary-foreground hover:text-primary-foreground",
              currentPage >= totalPages && "hidden"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
