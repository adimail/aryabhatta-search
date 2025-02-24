import React from "react";
import { type Metadata } from "next";
import { SearchResults } from "@/modules/search";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/search/sidebar";
import { Searchbar } from "@/modules/search";
import { getGroqChatCompletion } from "@/modules/search/llm";

interface SearchPageProps {
  params: { query: string };
  searchParams: {
    age?: string;
    educationalStatus?: string;
  };
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { query } = params;
  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { query } = params;
  const decodedQuery = decodeURIComponent(query);
  const badwords = new BadWordsNext({ data: en });

  if (badwords.check(decodedQuery)) {
    throw new Error("Search query contains offensive language.");
  }

  const age = searchParams.age ? parseInt(searchParams.age) : undefined;
  const educationalStatus = searchParams.educationalStatus;

  const summary = await getGroqChatCompletion({
    query: decodedQuery,
    age: age ?? null,
    educationalStatus: educationalStatus ?? null,
  });

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <div className="flex flex-1">
          <AppSidebar query={decodedQuery} summary={summary} />
          <main className="flex-1 overflow-auto p-5">
            <Searchbar userQuery={decodedQuery} />
            <SidebarTrigger />
            <SearchResults query={decodedQuery} summary={summary} />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
