"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Bitcoin",
    href: "/articles/bitcoin",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Ethereum",
    href: "/articles/ethereum",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Technology",
    href: "/articles/technology",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Business",
    href: "/articles/business",
    description: "Visually or semantically separates content.",
  },
  {
    title: "NFTs",
    href: "/articles/nft",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Yatırım",
    href: "/articles/investments",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <div className="md:hidden block fixed w-full z-20 text-primary-foreground text-sm font-medium transition-colors duration-300 ease-in-out">
      <div className={`${isScrolled ? "bg-primary" : "bg-transparent/40"}`}>
        <div className="flex justify-between items-center w-full px-4 py-2 h-10">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
          />
          <div className="">Logo</div>
          <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild className="">
              <Button
                variant="ghost"
                className="h-8 w-8 px-0 py-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="!size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[60svh] p-0 ">
              <div className="overflow-auto p-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-bold">Makaleler</h3>
                    <div className="flex flex-col space-y-2">
                      {components.map(
                        (item) =>
                          item.href && (
                            <MobileLink
                              key={item.href}
                              href={item.href}
                              onOpenChange={setOpen}
                              className="hover:text-secondary-foreground"
                            >
                              {item.title}
                            </MobileLink>
                          )
                      )}
                    </div>
                  </div>
                  <Link className="text-lg font-bold" href={"/contact"}>
                    İletişim
                  </Link>
                  <div className="flex items-center justify-center h-10 gap-4">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      size="lg"
                      className="text-secondary hover:text-secondary cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faSquareXTwitter}
                      size="lg"
                      className="text-secondary hover:text-secondary cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="lg"
                      className="text-secondary hover:text-secondary cursor-pointer"
                    />

                    {/* to add beat animation */}
                    {/* <FontAwesomeIcon icon={faYoutube} beatFade /> */}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
