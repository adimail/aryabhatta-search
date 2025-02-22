/* eslint-disable @next/next/no-img-element */
"use client";

import { GoogleSearch } from "./googlesearch";
import { LLMReact } from "./llmreact";

interface SearchResultsProps {
  query: string;
  summary: any;
}

export const SearchResults = ({ query, summary }: SearchResultsProps) => {

  return (
    <div className="mt-5 w-full space-y-8">

      <LLMReact summary={summary} />
      <GoogleSearch query={query} />

    </div>
  );
};
