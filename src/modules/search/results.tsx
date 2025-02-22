/* eslint-disable @next/next/no-img-element */
"use client";

import { env } from "@/env";
import { useState, useEffect } from "react";
import { GoogleSearch } from "./googlesearch";
import { LLMReact } from "./llmreact";

interface SearchResultsProps {
  query: string;
  summary: any;
}

interface YandexImage {
  thumbnail: string;
  link: string;
  title: string;
}

export const SearchResults = ({ query, summary }: SearchResultsProps) => {
  const [images, setImages] = useState<YandexImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Replace with your SerpApi key
  const SERP_API_KEY = env.SERP_API_KEY;

  useEffect(() => {
    const fetchYandexImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://serpapi.com/search.json?engine=yandex_images&text=${encodeURIComponent(
            query
          )}&yandex_domain=yandex.com&api_key=${SERP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images from Yandex API");
        }

        const data = await response.json();
        const imageResults = data.images_results || [];
        setImages(
          imageResults.map((img: any) => ({
            thumbnail: img.thumbnail,
            link: img.link,
            title: img.title,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchYandexImages();
    }
  }, [query]);

  return (
    <div className="mt-5 w-full space-y-8">
      <LLMReact summary={summary} />

      {/* Yandex Images Section */}
      <div className="yandex-images">
        <h2 className="text-xl font-bold mb-4">Images from Yandex</h2>
        {loading && <p>Loading images...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && images.length === 0 && (
          <p>No images found for "{query}"</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <p className="p-2 text-sm truncate">{image.title}</p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Uncomment if you still want Google Search */}
      {/* <GoogleSearch query={query} /> */}
    </div>
  );
};