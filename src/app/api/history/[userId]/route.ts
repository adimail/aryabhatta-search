import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { z } from "zod";

// Validation schema for the search query
const searchQuerySchema = z.object({
  query: z.string().min(1).max(500),
});

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const session = await auth();
  if (!session?.user || session.user.id !== params.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await db.searchHistory.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 10,
    });

    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const session = await auth();
  if (!session?.user || session.user.id !== params.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchId } = await request.json();

  try {
    await db.searchHistory.delete({
      where: {
        id: searchId,
        userId: params.userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete history item" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const session = await auth();
  if (!session?.user || session.user.id !== params.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { query } = searchQuerySchema.parse(body);

    const searchHistory = await db.searchHistory.create({
      data: {
        query,
        userId: params.userId,
        timestamp: new Date(),
      },
    });

    return NextResponse.json(searchHistory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid search query" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to save search history" },
      { status: 500 },
    );
  }
}
