"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";

const components: {
  title: string;
  href: string;
  description: string;
  disabled: boolean;
}[] = [
  {
    title: "Bitcoin",
    href: "/blog?q=bitcoin",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    disabled: false,
  },
  {
    title: "Ethereum",
    href: "/blog?q=ethereum",
    description:
      "For sighted users to preview content available behind a link.",
    disabled: false,
  },
  {
    title: "ETF",
    href: "/blog?q=etf",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    disabled: false,
  },
  {
    title: "Solana",
    href: "/blog?q=solana",
    description: "Visually or semantically separates content.",
    disabled: false,
  },
  {
    title: "NFT",
    href: "/blog?q=nft",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    disabled: false,
  },
  {
    title: "Yatırım",
    href: "/blog?q=yatırım",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    disabled: true,
  },
];

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const NavPages = () => {
  return (
    <NavigationMenu className={roboto.className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-secondary-foreground focus:bg-transparent focus:text-primary-foreground data-[active]:bg-transparent data-[state=open]:bg-transparent">
            Makaleler
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-primary-foreground">
              {components.map((component) => (
                <TooltipProvider delayDuration={100} key={component.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <ListItem
                          title={component.title}
                          href={component.href}
                          disabled={component.disabled}
                          className="hover:bg-secondary-foreground text-secondary hover:text-primary-foreground"
                        >
                          {/* {component.description} */}
                        </ListItem>
                      </div>
                    </TooltipTrigger>
                    {component.disabled && (
                      <TooltipContent>
                        <p className="text-primary">Yakında</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-secondary-foreground focus:bg-transparent focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent">
              İletişim
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { disabled?: boolean }
>(({ className, title, children, disabled, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            disabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...(disabled ? { onClick: (e) => e.preventDefault() } : props)}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
