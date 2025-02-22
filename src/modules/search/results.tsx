/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { YoutubeIcon, LinkIcon, ImageIcon, BookOpenIcon, NewspaperIcon } from "lucide-react";
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

  if (isLoading) return <div className="mt-5 w-full text-center"><p>Loading results...</p></div>;
  if (error) return <div className="mt-5 w-full text-center text-red-500"><p>{error}</p></div>;
  if (!data?.items) return null;

  // Extract images from all results
  const images = data.items
    .filter(item => item.pagemap?.cse_thumbnail)
    .map(item => ({
      src: item.pagemap?.cse_thumbnail?.[0]?.src ?? "",
      title: item.title,
      link: item.link
    }))
    .slice(0, 3); // Take first 3 images

  const videoResults = data.items.filter(
    item => item.displayLink === "www.youtube.com" && item.link.includes("/watch")
  );

  const textResults = data.items.filter(
    item => !item.displayLink.includes("youtube.com") || !item.link.includes("/watch")
  );

  return (
    <div className="mt-5 w-full space-y-8">
      <div className="rounded-lg border p-4">
        {/* Images Section */}
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="text-blue-600" />
              Visual Overview
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <a
                  key={index}
                  href={image.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-40 overflow-hidden rounded-lg border hover:border-blue-500"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quick Definition */}
        {textResults[0] && (
          <div className="mb-8">
            <h2 className="mb-2 text-lg font-semibold flex items-center gap-2">
              <BookOpenIcon className="text-amber-600" />
              Quick Definition
            </h2>
            <p className="text-gray-700 text-sm border-l-4 border-amber-200 pl-4 py-2">
              {textResults[0].snippet}
            </p>
          </div>
        )}

        {/* Detailed Explanation */}
        {textResults[1] && (
          <div className="mb-8 prose max-w-none">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <NewspaperIcon className="text-green-600" />
              Detailed Explanation
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {textResults[1].snippet}
              </p>
            </div>
          </div>
        )}

        {/* Essential Sources */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
            <LinkIcon className="text-gray-600" />
            Essential Sources
          </h2>
          <div className="space-y-4">
            {textResults.slice(0, 3).map((result, index) => (
              <a
                key={index}
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border hover:border-blue-500 transition-all"
              >
                <h3 className="font-semibold text-blue-600">{result.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{result.displayLink}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{result.snippet}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Video Section - if exists */}
        {videoResults.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <YoutubeIcon className="text-red-600" />
              Featured Video
            </h2>
            <a
              href={videoResults[0]?.link ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border p-4 hover:border-blue-500"
            >
              <div className="flex gap-4">
                {videoResults[0]?.pagemap?.cse_thumbnail && (
                  <img
                    src={videoResults[0]?.pagemap?.cse_thumbnail?.[0]?.src ?? ""}
                    alt={videoResults[0]?.title ?? ""}
                    className="w-48 h-36 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-blue-600">{videoResults[0]?.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{videoResults[0]?.snippet}</p>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
