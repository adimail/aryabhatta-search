/* eslint-disable @next/next/no-img-element */
"use client";

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

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch("/api/yandex-images?query=" + query).then((res) => {
        res.json().then((data) => {
          setImages(data.images_results);
          setLoading(false);
        });
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="mt-5 w-full space-y-8">
      <LLMReact summary={summary} />

      <div className="yandex-images">
        <h2 className="text-xl font-bold mb-4">Images</h2>
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

      {/* <GoogleSearch query={query} /> */}
    </div>
  );
};