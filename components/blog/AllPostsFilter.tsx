"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
const tags = [
  {
    name: "Bitcoin",
    hidden: false,
  },
  {
    name: "Ethereum",
    hidden: false,
  },
  {
    name: "Etf",
    hidden: false,
  },
  {
    name: "Solana",
    hidden: false,
  },
  {
    name: "Nft",
    hidden: false,
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}
interface Tag {
  name: string;
  count: number;
}

export const AllPostsFilter = ({ className, ...props }: ExamplesNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleFilter(tag: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (tag) {
      params.set("q", tag);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:gap-5 gap-2 w-full max-w-lg">
      <ScrollArea className="w-[calc(100vw-48px)] md:w-auto" type="auto">
        <div className={cn("flex items-center", className)} {...props}>
          <div className="flex items-center gap-1">
            <TagLink
              tag={{ name: "Hepsi", hidden: false }}
              isActive={pathname === "/blog" && searchParams.get("q") === null}
              onClick={() => {
                handleFilter("");
              }}
            />
            {tags.map((tag) => (
              <TagLink
                key={tag.name}
                tag={{
                  name: tag.name,
                  hidden: tag.hidden,
                }}
                isActive={
                  pathname === `/blog` &&
                  searchParams.get("q") === tag.name.toLowerCase()
                }
                onClick={() => {
                  handleFilter(tag.name.toLowerCase());
                }}
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="pt-1" />
      </ScrollArea>
    </div>
  );
};

function TagLink({
  tag,
  isActive,
  onClick,
}: {
  tag: (typeof tags)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  if (tag.hidden) {
    return null;
  }

  return (
    <Button
      lang="tr"
      className="flex h-7 bg-primary-foreground items-center justify-center rounded-full text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-secondary-foreground data-[active=true]:bg-transparent data-[active=true]:text-secondary-foreground uppercase px-3"
      data-active={isActive}
      onClick={onClick}
    >
      {tag.name}
    </Button>
  );
}
