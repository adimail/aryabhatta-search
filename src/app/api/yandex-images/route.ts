// pages/api/yandex-images.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json(
            { error: "Query parameter is required" },
            { status: 400 }
        );
    }

    try {
        const serpApiKey = process.env.SERP_API_KEY;
        const url = `https://serpapi.com/search.json?engine=yandex_images&text=${encodeURIComponent(
            query
        )}&api_key=${serpApiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch from Yandex");
        }

        const data = await response.json();
        return NextResponse.json({ images_results: data.images_results ?? [] });
    } catch (error) {
        console.error("Yandex Images API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}