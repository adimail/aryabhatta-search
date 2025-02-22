/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import parseJson, { JSONError } from "parse-json";
import { useTypewriter } from "@/hooks/use-typewriter";

interface ChatMessage {
    content: string;
}

interface ChatChoice {
    message: ChatMessage;
}

interface ChatCompletion {
    choices: ChatChoice[];
}

interface ParsedData {
    summary: string;
    Structure: Record<string, any> | any[];
}

const extractJson = (text: string): string => {
    const regex = /```(?:json)?\n([\s\S]*?)```/;
    const match = regex.exec(text);
    return match?.[1]?.trim() ?? text.trim();
};

const parseData = (jsonString: string): ParsedData | null => {
    try {
        const jsonToParse = extractJson(jsonString);
        const parsed = parseJson(jsonToParse) as unknown as ParsedData;
        return parsed;
    } catch (error) {
        if (error instanceof JSONError) {
            console.error("Invalid JSON:", error.message);
        }
        return null;
    }
};

export const LLMReact = ({ summary }: { summary: ChatCompletion }) => {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [displayedStructure, setDisplayedStructure] = useState<Array<{ category: string; items: string[] }>>([]);
    const [currentItem, setCurrentItem] = useState({ category: -1, item: -1 });

    // Use typewriter for summary
    const [displayedText, isTypingSummary] = useTypewriter(parsedData?.summary ?? "", {
        speed: 20,
        delay: 0,
    });

    // Store raw summary for fallback
    const rawSummary = parsedData?.summary ?? "";

    useEffect(() => {
        const jsonData = summary.choices[0]?.message.content ?? "";
        console.log("Raw LLM Response:", jsonData); // Debug raw input
        const parsed = parseData(jsonData);
        console.log("Parsed Data:", parsed); // Debug parsed output
        setParsedData(parsed);
        setCurrentItem({ category: 0, item: 0 });

        if (parsed) {
            const structure = Array.isArray(parsed.Structure)
                ? parsed.Structure.flatMap((item) =>
                    Object.entries(item).map(([category, items]) => ({
                        category,
                        items: Array.isArray(items) ? items : [],
                    }))
                )
                : Object.entries(parsed.Structure).map(([category, items]) => ({
                    category,
                    items: Array.isArray(items) ? items : [],
                }));

            setDisplayedStructure(structure);
        }
    }, [summary]);

    useEffect(() => {
        if (!displayedStructure.length || isTypingSummary) return;

        const timer = setInterval(() => {
            setCurrentItem((prev) => {
                const currentCategory = displayedStructure[prev.category];
                if (!currentCategory) return prev;

                if (prev.item < currentCategory.items.length - 1) {
                    return { ...prev, item: prev.item + 1 };
                } else if (prev.category < displayedStructure.length - 1) {
                    return { category: prev.category + 1, item: 0 };
                }
                return prev;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [displayedStructure, isTypingSummary]);

    if (!parsedData) {
        return <p className="text-red-500">Invalid JSON data</p>;
    }

    return (
        <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Summary</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {/* Ensure full summary is displayed once typing completes */}
                {isTypingSummary ? displayedText : rawSummary}
                {isTypingSummary && <span className="animate-pulse">|</span>}
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Structure</h2>
            <div className="space-y-6">
                {displayedStructure.map((structure, categoryIdx) => (
                    <div
                        key={`${categoryIdx}-${structure.category}`}
                        className={`bg-white p-4 rounded-lg shadow ${categoryIdx <= currentItem.category ? "animate-fadeIn" : "opacity-0"
                            }`}
                        style={{
                            animationDelay: "0ms",
                            animationFillMode: "forwards",
                        }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {structure.category}
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {structure.items.map((item, itemIdx) => (
                                <li
                                    key={itemIdx}
                                    className={`transition-opacity duration-200 ${categoryIdx < currentItem.category ||
                                            (categoryIdx === currentItem.category && itemIdx <= currentItem.item)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {currentItem.category < displayedStructure.length && (
                    <span className="animate-pulse">|</span>
                )}
            </div>
        </div>
    );
};