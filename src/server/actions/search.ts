// src/server/actions/search.ts

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

export async function fetchSearchResults(query: string): Promise<SearchResponse> {
  const API_KEY = 'AIzaSyAzV1oWQUPIYe2srPjbxmlW63W0WzuWp7k';
  const CSE_ID = '1177febd54db84a0f';
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  // Explicitly cast the JSON response to SearchResponse.
  const data = (await res.json()) as SearchResponse;
  return data;
}
