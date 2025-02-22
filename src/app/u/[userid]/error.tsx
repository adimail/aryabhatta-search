"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="mb-2 text-lg font-semibold text-red-800">
          Something went wrong!
        </h2>
        <p className="mb-4 text-red-600">
          There was an error loading the search results.
        </p>
        <button
          onClick={reset}
          className="mx-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="mx-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
