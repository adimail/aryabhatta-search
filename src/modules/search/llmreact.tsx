import { useState, useEffect } from 'react';
import parseJson, { JSONError } from 'parse-json';

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

// Function to extract JSON content from text wrapped in triple backticks.
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

    useEffect(() => {
        const jsonData = summary.choices[0]?.message.content ?? "";
        setParsedData(parseData(jsonData));
    }, [summary]);

    if (!parsedData) {
        return <p className="text-red-500">Invalid JSON data</p>;
    }

    return (
        <div className="">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Summary</h2>
            <p className="text-gray-700 mb-6">{parsedData.summary}</p>

            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Structure</h2>
            <div className="space-y-6">
                {Array.isArray(parsedData.Structure) ? (
                    // If Structure is an array of objects
                    parsedData.Structure.map((structureItem, idx) =>
                        Object.entries(structureItem).map(([category, items]) => (
                            <div key={`${idx}-${category}`} className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
                                {Array.isArray(items) ? (
                                    <ul className="list-disc list-inside text-gray-700">
                                        {items.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">Invalid data format</p>
                                )}
                            </div>
                        ))
                    )
                ) : (
                    // Otherwise, if Structure is an object
                    Object.entries(parsedData.Structure).map(([category, items]) => (
                        <div key={category} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
                            {Array.isArray(items) ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {items.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-700">Invalid data format</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
