/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { generatePrompt } from "@/utils/promt";
import Groq from "groq-sdk";
import * as config from "@/server/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion({
  query,
  age,
  educationalStatus,
}: {
  query: string;
  age: number | null;
  educationalStatus: string | null;
}) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: generatePrompt(query, age ?? 20, educationalStatus ?? ""),
      },
    ],
    model: config.LLM_MODEL,
    temperature: config.LLM_TEMPERATURE,
  });

  console.log(response);
  return response ?? "";
}

export const SearchResults = async ({ summary }: { summary: string }) => {
  return <div className="mt-5 w-full space-y-4">{summary}</div>;
};
