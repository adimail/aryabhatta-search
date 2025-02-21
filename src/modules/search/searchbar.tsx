"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "sonner";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";

export function Searchbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const badwords = new BadWordsNext({ data: en });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (badwords.check(trimmedQuery)) {
      toast.error("Please avoid using offensive language.");
      return;
    }

    if (trimmedQuery) {
      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
    } else {
      toast.error("Please enter a valid query.");
    }
  };

  return (
    <div className="w-full">
      <p>Find anything you want to know about...</p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-5 mt-5 flex items-center overflow-hidden rounded-lg border-2 border-black bg-white p-2 md:p-3"
      >
        <input
          type="text"
          placeholder="I want to discover..."
          className="w-full flex-grow text-sm focus:outline-none"
          maxLength={40}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white transition-all hover:translate-x-1"
        >
          <FaChevronRight size={15} />
        </button>
      </form>
    </div>
  );
}
