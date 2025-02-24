"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "sonner";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EDUCATIONAL_STATUS_OPTIONS = [
  { value: "Elementary School", label: "Elementary School" },
  { value: "Middle School", label: "Middle School" },
  { value: "High School", label: "High School" },
  { value: "College", label: "College" },
  { value: "University", label: "University" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post-Graduate", label: "Post-Graduate" },
];

const AGE_OPTIONS = Array.from({ length: 97 }, (_, i) => i + 4);

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [age, setAge] = useState<string>("");
  const [educationalStatus, setEducationalStatus] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const savedAge = localStorage.getItem("userAge");
    const savedEducation = localStorage.getItem("userEducation");
    if (savedAge) setAge(savedAge);
    if (savedEducation) setEducationalStatus(savedEducation);
  }, []);

  const savePreferences = (newAge: string, newEducation: string) => {
    localStorage.setItem("userAge", newAge);
    localStorage.setItem("userEducation", newEducation);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const badwords = new BadWordsNext({ data: en });

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

      const searchParams = new URLSearchParams();
      if (age) searchParams.append("age", age);
      if (educationalStatus)
        searchParams.append("educationalStatus", educationalStatus);

      const queryString = searchParams.toString();
      const url = `/search/${encodeURIComponent(trimmedQuery)}${queryString ? `?${queryString}` : ""}`;

      savePreferences(age, educationalStatus);
      router.push(url);
    } else {
      toast.error("Please enter a valid query.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto mb-5 flex flex-col items-center overflow-hidden rounded-lg border-2 border-black md:max-w-[600px]"
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

      <Separator className="mb-5 mt-10 bg-gray-400" />

      <p className="mb-3 text-sm">
        Select age and education level for better results
      </p>
      <div className="mx-auto flex w-3/4 gap-4">
        <Select value={age} onValueChange={setAge}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select age" />
          </SelectTrigger>
          <SelectContent>
            {AGE_OPTIONS.map((age) => (
              <SelectItem key={age} value={age.toString()}>
                {age} years
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={educationalStatus} onValueChange={setEducationalStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Education level" />
          </SelectTrigger>
          <SelectContent>
            {EDUCATIONAL_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
