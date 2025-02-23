/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  YoutubeIcon,
  LinkIcon,
  ImageIcon,
  BookOpenIcon,
  NewspaperIcon,
} from "lucide-react";
import { fetchSearchResults } from "@/server/actions/search";
import type { SearchResponse } from "@/server/actions/search";

export const GoogleSearch = ({ query }: { query: string }) => {
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
        setError("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      void fetchData();
    }
  }, [query]);

  if (isLoading)
    return (
      <div className="mt-5 w-full text-center">
        <p>Loading results...</p>
      </div>
    );
  if (error)
    return (
      <div className="mt-5 w-full text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  if (!data?.items) return null;

  // Extract images from all results
  const images = data.items
    .filter((item) => item.pagemap?.cse_thumbnail)
    .map((item) => ({
      src: item.pagemap?.cse_thumbnail?.[0]?.src ?? "",
      title: item.title,
      link: item.link,
    }))
    .slice(0, 3); // Take first 3 images

  const videoResults = data.items.filter(
    (item) =>
      item.displayLink === "www.youtube.com" && item.link.includes("/watch"),
  );

  const textResults = data.items.filter(
    (item) =>
      !item.displayLink.includes("youtube.com") ||
      !item.link.includes("/watch"),
  );

  return (
    <div className="rounded-lg border p-4">
      {/* Images Section */}
      {images.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
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
                  className="h-full w-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Definition */}
      {textResults[0] && (
        <div className="mb-8">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <BookOpenIcon className="text-amber-600" />
            Quick Definition
          </h2>
          <p className="border-l-4 border-amber-200 py-2 pl-4 text-sm text-gray-700">
            {textResults[0].snippet}
          </p>
        </div>
      )}

      {/* Detailed Explanation */}
      {textResults[1] && (
        <div className="prose mb-8 max-w-none">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <NewspaperIcon className="text-green-600" />
            Detailed Explanation
          </h2>
          <div className="rounded-lg bg-gray-50 p-6">
            <p className="leading-relaxed text-gray-700">
              {textResults[1].snippet}
            </p>
          </div>
        </div>
      )}

      {/* Essential Sources */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
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
              className="block rounded-lg border p-4 transition-all hover:border-blue-500"
            >
              <h3 className="font-semibold text-blue-600">{result.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{result.displayLink}</p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {result.snippet}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Video Section - if exists */}
      {videoResults.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
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
                  className="h-36 w-48 rounded object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-blue-600">
                  {videoResults[0]?.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {videoResults[0]?.snippet}
                </p>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};
