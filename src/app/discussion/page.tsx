import React from "react";
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { discussions } from "@/server/config";

const DiscussionPage = () => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full rounded-lg border px-4 py-2 pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="mt-4 flex gap-4">
          <select className="rounded-lg border bg-white px-4 py-2">
            <option>All Categories</option>
            <option>Backpack Prediction</option>
            <option>LLMs</option>
            <option>Machine Learning</option>
          </select>

          <select className="rounded-lg border bg-white px-4 py-2">
            <option>Sort by: Recent</option>
            <option>Most Voted</option>
            <option>Most Discussed</option>
          </select>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="rounded-lg border p-4 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://robohash.org/${discussion.author}`}
                    alt="avatar"
                    className="rounded-full"
                    width={52}
                    height={52}
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      {discussion.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {discussion.author} · in {discussion.category} · Last
                      comment {discussion.lastComment.time} by{" "}
                      {discussion.lastComment.by}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-gray-500" />
                  <span>{discussion.comments} comments</span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="rounded p-1 hover:bg-gray-100">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{discussion.votes}</span>
                  <button className="rounded p-1 hover:bg-gray-100">
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>

                <button className="rounded p-1 hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg hover:bg-blue-700">
        Ask Question
      </button>
    </div>
  );
};

export default DiscussionPage;
