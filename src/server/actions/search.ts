"use server";

import { env } from "@/env";
import { db } from "@/server/db";

export interface SearchResult {
  kind: string;
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
    cse_image?: Array<{
      src: string;
    }>;
  };
}

export interface SearchResponse {
  items: SearchResult[];
  searchInformation: {
    formattedTotalResults: string;
    formattedSearchTime: string;
  };
}

export async function fetchSearchResults(
  query: string,
): Promise<SearchResponse> {
  const url = `https://www.googleapis.com/customsearch/v1?key=${env.GOOGLE_SEARCH_API_KEY}&cx=${env.GOOGLE_SEARCH_CSE_ID}&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  // Explicitly cast the JSON response to SearchResponse.
  const data = (await res.json()) as SearchResponse;
  return data;
}

export async function getSearchHistory(userId: string) {
  try {
    const history = await db.searchHistory.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 50,
    });

    return history;
  } catch (error) {
    console.error("Error fetching search history:", error);
    return [];
  }
}
