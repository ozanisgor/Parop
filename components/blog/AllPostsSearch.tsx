"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSearchTerm("");
  }, 700);

  return (
    <div className="relative flex flex-1 flex-shrink-0 md:max-w-lg max-w-none max-lg:w-full">
      <Label htmlFor="search" className="sr-only">
        Arama
      </Label>
      <Input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus-visible:ring-secondary focus-visible:ring-1"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        value={searchTerm}
        id="search"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="lg"
        className={`absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-secondary-foreground`}
      />
    </div>
  );
}
