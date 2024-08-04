"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function GetButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getLatest = async () => {
    setIsLoading(true);
    try {
      const postsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/scrape`
      );
      setIsLoading(false);
      await getAll();
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data: ", error);
    }
  };

  const getAll = async () => {
    setIsLoading(true);
    try {
      const postsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
      );
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <Button onClick={() => getLatest()} disabled={isLoading ? true : false}>
      {isLoading ? (
        <span className="flex gap-3 items-center">
          <span>Generating...</span>
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <span>Create Post</span>
      )}
    </Button>
  );
}
