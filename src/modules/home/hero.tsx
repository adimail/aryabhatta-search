import React from "react";
import Link from "next/link";
import { SearchBar } from "./searchbar";
// import { TrendingTopics } from "./trendingtopics";

export const Hero = () => {
  return (
    <div className="">
      <main className="container mx-auto px-4 md:pt-12">
        <section className="my-10 text-center">
          <h2
            className="mb-4 text-2xl font-bold md:text-5xl"
            // style={{ fontFamily: "clepto" }}
          >
            <Link href="/about" className="hover:underline">
              Aryabhatta Search
            </Link>
          </h2>
          <p className="mb-8 text-sm text-gray-600 md:text-lg">
            Find the perfect resource for every question with Aryabhatta Search.
          </p>
          <SearchBar />
        </section>
        {/* <TrendingTopics /> */}
      </main>
    </div>
  );
};
