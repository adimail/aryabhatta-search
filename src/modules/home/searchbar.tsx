"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "sonner";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";
import Link from "next/link";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const badwords = new BadWordsNext({ data: en });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (badwords.check(trimmedQuery)) {
      toast.error("Please avoid using offensive language.");
      return;
    }

    if (trimmedQuery) {
      if (session) {
        try {
          await fetch(`/api/history/${session.user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: trimmedQuery }),
          });
        } catch (error) {
          console.error("Error saving search history:", error);
        }
      }

      // Navigate to the search results page
      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
    } else {
      toast.error("Please enter a valid query.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex flex-col items-center overflow-hidden rounded-lg border-2 border-black md:max-w-[600px]"
      >
        <input
          type="text"
          placeholder="I want to discover..."
          className="w-full flex-grow p-3 pb-16 focus:outline-none"
          maxLength={40}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-blue-500 p-2 text-white transition-all hover:translate-x-1"
        >
          <FaChevronRight size={15} />
        </button>
      </form>
      <section className="mx-auto my-10 mb-12 flex w-full space-x-4 overflow-y-auto pb-4 md:justify-center">
        <button className="rounded-lg bg-white px-4 py-2 shadow">
          Subjects
        </button>
        <button className="rounded-lg bg-white px-4 py-2 shadow">
          Courses
        </button>
        <Link href="/tests">
          <button className="rounded-lg bg-white px-4 py-2 shadow">
            Tests
          </button>
        </Link>
        <button className="rounded-lg bg-white px-4 py-2 shadow">
          Research Papers
        </button>
      </section>
    </div>
  );
};
