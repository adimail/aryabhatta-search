"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "sonner";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";
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

export function Searchbar({ userQuery }: { userQuery: string }) {
  const [query, setQuery] = useState(userQuery);
  const [age, setAge] = useState<string>("");
  const [educationalStatus, setEducationalStatus] = useState<string>("");
  const router = useRouter();

  // Add state to track URL params
  const [urlParams, setUrlParams] = useState<{
    age?: string;
    educationalStatus?: string;
  }>({});

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedAge = localStorage.getItem("userAge");
    const savedEducation = localStorage.getItem("userEducation");
    if (savedAge) setAge(savedAge);
    if (savedEducation) setEducationalStatus(savedEducation);

    // Get current URL search params
    const searchParams = new URLSearchParams(window.location.search);
    setUrlParams({
      age: searchParams.get("age") ?? undefined,
      educationalStatus: searchParams.get("educationalStatus") ?? undefined,
    });
  }, []);

  const savePreferences = (newAge: string, newEducation: string) => {
    localStorage.setItem("userAge", newAge);
    localStorage.setItem("userEducation", newEducation);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const badwords = new BadWordsNext({ data: en });

    if (badwords.check(trimmedQuery)) {
      toast.error("Please avoid using offensive language.");
      return;
    }

    if (trimmedQuery) {
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

  const handleLoadResults = () => {
    const searchParams = new URLSearchParams();
    if (age) searchParams.append("age", age);
    if (educationalStatus)
      searchParams.append("educationalStatus", educationalStatus);

    const queryString = searchParams.toString();
    const url = `/search/${encodeURIComponent(query)}${queryString ? `?${queryString}` : ""}`;

    savePreferences(age, educationalStatus);
    router.refresh();
    router.push(url);
  };

  // Check if current selections match URL params
  const shouldShowLoadButton =
    (age && age !== urlParams.age) ??
    (educationalStatus && educationalStatus !== urlParams.educationalStatus) ??
    (!age && urlParams.age) ??
    (!educationalStatus && urlParams.educationalStatus);

  return (
    <div className="mb-3 w-full">
      <form onSubmit={handleSubmit} className="mx-auto space-y-4">
        <div className="flex items-center overflow-hidden rounded-lg border-2 border-black bg-white p-2 md:p-3">
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
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 gap-4">
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger className="w-full sm:w-[200px]">
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

            <Select
              value={educationalStatus}
              onValueChange={setEducationalStatus}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
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

          {shouldShowLoadButton && (
            <button
              type="button"
              onClick={handleLoadResults}
              className="rounded-lg bg-green-400 px-4 py-2 text-white transition-all hover:bg-green-600 active:scale-95"
            >
              Load Results
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
