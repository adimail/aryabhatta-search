/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { YoutubeIcon, LinkIcon } from "lucide-react";
import { fetchSearchResults } from "@/server/actions/search";
import type { SearchResponse, SearchResult } from "@/server/actions/search";

interface SearchResultsProps {
  query: string;
}

export const SearchResults = ({ query }: SearchResultsProps) => {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Explicitly typing the result to SearchResponse
        const results: SearchResponse = await fetchSearchResults(query);
        setData(results);
      } catch (_error) {
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      void fetchData();
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="mt-5 w-full text-center">
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 w-full text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!data?.items) {
    return null;
  }

  const videoResults = data.items.filter(
    (item) =>
      item.displayLink === "www.youtube.com" && item.link.includes("/watch")
  );

  const generalResults = data.items.filter(
    (item) => !item.displayLink.includes("youtube.com") || !item.link.includes("/watch")
  );

  return (
    <div className="mt-5 w-full space-y-8">
      <div className="rounded-lg border p-4">
        <p className="mb-4 text-gray-600">
          Found {data.searchInformation.formattedTotalResults} results (
          {data.searchInformation.formattedSearchTime} seconds)
        </p>

        {/* Video Results Section */}
        {videoResults.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <YoutubeIcon className="text-red-600" />
              Video Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoResults.map((result, index) => (
                <a
                  key={index}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-lg border hover:border-blue-500 overflow-hidden transition-all"
                >
                  {result.pagemap?.cse_thumbnail && (
                    <div className="relative w-full h-48">
                      <img
                        src={result.pagemap.cse_thumbnail[0]?.src ?? ""}
                        alt={result.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-600 line-clamp-2">
                      {result.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {result.snippet}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* General Results Section */}
        {generalResults.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <LinkIcon className="text-gray-600" />
              Web Results
            </h2>
            <div className="space-y-4">
              {generalResults.map((result, index) => (
                <a
                  key={index}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {result.title}
                    </h3>
                    {result.pagemap?.cse_thumbnail && (
                      <div className="relative w-16 h-16 ml-4">
                        <img
                          src={result.pagemap.cse_thumbnail[0]?.src ?? ""}
                          alt={result.title}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {result.displayLink}
                  </p>
                  <p className="mt-2 text-gray-600">{result.snippet}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
