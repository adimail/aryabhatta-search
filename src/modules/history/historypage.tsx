/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { SearchIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

export const HistoryPage = ({ userId }: { userId: string }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/history/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load search history:", error);
      toast.error("Failed to load search history");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (searchId: string) => {
    try {
      const response = await fetch(`/api/history/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchId }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      setHistory(history.filter((item) => item.id !== searchId));
      toast.success("Search history item deleted");
    } catch (error) {
      console.error("Failed to delete history item:", error);
      toast.error("Failed to delete history item");
    }
  };

  useEffect(() => {
    if (userId) void fetchHistory();
  }, [userId]);

  if (isLoading) {
    return <div className="mt-8 text-center">Loading history...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No search history found
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Recent Searches</h1>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4 hover:border-blue-500"
          >
            <div className="flex items-center gap-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
              <div>
                <Link
                  href={`/search?q=${encodeURIComponent(item.query)}`}
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {item.query}
                </Link>
                <p className="text-sm text-gray-500">
                  {format(new Date(item.timestamp), "PPpp")}
                </p>
              </div>
            </div>
            <button
              onClick={() => void deleteHistoryItem(item.id)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-500"
              aria-label="Delete search history item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
