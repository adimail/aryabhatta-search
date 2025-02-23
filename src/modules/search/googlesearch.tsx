/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { YoutubeIcon, LinkIcon } from "lucide-react";
import { fetchSearchResults } from "@/server/actions/search";
import type { SearchResponse } from "@/server/actions/search";
import { Card } from "@/components/ui/card";
import type { GoogleSearchProps, YandexImage } from "./types";

export const GoogleSearch = ({ query }: GoogleSearchProps) => {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<YandexImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const res = await fetch("/api/yandex-images?query=" + query);
          const data = await res.json();
          setImages(data.images_results as YandexImage[]);
          setIsLoading(false);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Failed to fetch images",
          );
          setIsLoading(false);
        }
      }
    };

    if (query) {
      void fetchImages();
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await fetchSearchResults(query);
        setData(results);
      } catch (error) {
        setError("Failed to fetch search results");
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
      <div className="mt-5 flex w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!data?.items) return null;

  const topLinks = data.items
    .filter((item) => !item.displayLink.includes("youtube.com"))
    .slice(0, 5);

  const videoResults = data.items
    .filter(
      (item) =>
        item.displayLink === "www.youtube.com" && item.link.includes("/watch"),
    )
    .slice(0, 2);

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Top Links Column */}
        <Card className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Top Results</h2>
          </div>
          <div className="space-y-4">
            {topLinks.map((result, index) => (
              <a
                key={index}
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border p-3 transition-all hover:border-blue-500 hover:bg-gray-50"
              >
                <h3 className="font-medium text-blue-600 hover:underline">
                  {result.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {result.displayLink}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {result.snippet}
                </p>
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          {images && images.length > 0 && (
            <>
              <h2 className="mb-4 text-xl font-bold">Images</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded border">
                    <a
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="h-48 w-full object-cover"
                      />
                      <p className="truncate p-2 text-sm">{image.title}</p>
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* YouTube Videos Section */}
      {videoResults.length > 0 && (
        <Card className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <YoutubeIcon className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold">Related Videos</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {videoResults.map((video, index) => (
              <a
                key={index}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border transition-all hover:border-red-500"
              >
                <div className="relative">
                  {video.pagemap?.cse_thumbnail && (
                    <div className="relative">
                      <img
                        src={video.pagemap?.cse_thumbnail?.[0]?.src}
                        alt={video.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <YoutubeIcon className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="line-clamp-2 font-medium text-blue-600 group-hover:text-blue-700">
                      {video.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {video.snippet}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
