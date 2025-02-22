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
  params: Promise<{ query: string }>;
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { query } = await params;
  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(query);
  const badwords = new BadWordsNext({ data: en });

  if (badwords.check(decodedQuery)) {
    throw new Error("Search query contains offensive language.");
  }

  const summary = await getGroqChatCompletion({ query: decodedQuery });

  return (
    <main className="container mx-auto p-5">
      <SidebarProvider>
        <AppSidebar query={decodedQuery} summary={summary} />
        <main>
          <Searchbar />
          <SidebarTrigger />
          <SearchResults query={decodedQuery} summary={summary} />
        </main>
      </SidebarProvider>
    </main>
  );
}
