import React from "react";
import { SearchBar } from "./searchbar";
import { TrendingTopics } from "./trendingtopics";

export const Hero = () => {
  return (
    <div className="">
      <main className="container mx-auto px-4 md:py-12">
        <section className="my-20 text-center">
          <h2
            className="mb-4 text-4xl font-bold md:text-5xl"
            // style={{ fontFamily: "clepto" }}
          >
            Aryabhatta Search
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Access millions of educational materials, courses, and research
            papers in one place
          </p>
          <SearchBar />
        </section>
        <TrendingTopics />
      </main>
    </div>
  );
};
