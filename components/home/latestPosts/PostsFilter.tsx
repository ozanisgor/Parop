import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const examples = [
  {
    name: "Bitcoin",
    code: "/bitcoin",
    hidden: false,
  },
  {
    name: "Ethereum",
    code: "/ethereum",
    hidden: false,
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PostsFilter = ({ className, ...props }: ExamplesNavProps) => {
  const pathname = usePathname();
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-5 mt-1 mb-7">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center", className)} {...props}>
          <div className="flex items-center gap-5">
            <ExampleLink
              example={{ name: "Hepsi", code: "", hidden: false }}
              isActive={pathname === "/"}
            />
            {examples.map((example) => (
              <ExampleLink
                key={example.code}
                example={example}
                isActive={pathname?.startsWith(example.code) ?? false}
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <Link
        href={"/"}
        className="flex mb-2 justify-end h-7 bg-primary-foreground items-center rounded-full text-center text-sm font-medium text-muted-foreground transition-colors hover:text-secondary-foreground data-[active=true]:bg-transparent data-[active=true]:text-secondary-foreground w-max"
      >
        Hepsini İncele
      </Link>
    </div>
  );
};

function ExampleLink({
  example,
  isActive,
}: {
  example: (typeof examples)[number];
  isActive: boolean;
}) {
  if (example.hidden) {
    return null;
  }

  return (
    <Link
      href={example.code}
      key={example.code}
      className="flex h-7 bg-primary-foreground items-center justify-center rounded-full text-center text-sm font-medium text-muted-foreground transition-colors hover:text-secondary-foreground data-[active=true]:bg-transparent data-[active=true]:text-secondary-foreground"
      data-active={isActive}
    >
      {example.name}
    </Link>
  );
}
