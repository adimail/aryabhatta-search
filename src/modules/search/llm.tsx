/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Groq from "groq-sdk";
import * as config from "@/server/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion({ query }: { query: string }) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Summarize the following query in a clear and concise manner, preserving key details while ensuring brevity: ${query}`,
      },
    ],
    model: config.LLM_MODEL,
    temperature: config.LLM_TEMPERATURE,
  });

  console.log(response);
  return response;
}




export const SearchResults = async ({ query }: { query: string }) => {
  const response = await getGroqChatCompletion({ query });

  console.log(response);
  return (
    <div className="mt-5 w-full space-y-4">
      {response ? response.choices[0]?.message.content : ""}
    </div>
  );
};