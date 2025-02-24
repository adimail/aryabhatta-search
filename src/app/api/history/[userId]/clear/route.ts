import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.id !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.searchHistory.deleteMany({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json({ message: "History cleared" }, { status: 200 });
  } catch (error) {
    console.error("Failed to clear search history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
