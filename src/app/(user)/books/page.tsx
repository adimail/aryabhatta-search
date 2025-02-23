import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Search } from "lucide-react";

async function getSearchHistory(userId: string) {
  try {
    return await db.searchHistory.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: 10,
    });
  } catch (error) {
    console.error("Failed to fetch search history:", error);
    return [];
  }
}

export default async function BooksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const searchHistory = await getSearchHistory(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Book Recommendations Section */}
        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-bold">Book Recommendations</h2>
          {/* Add your book recommendations content here */}
        </Card>

        {/* Search History Section */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Searches</h2>
            <Clock className="h-5 w-5 text-gray-500" />
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {searchHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">{item.query}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/search/${encodeURIComponent(item.query)}`}
                    className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    Search Again
                  </a>
                </div>
              ))}
              {searchHistory.length === 0 && (
                <p className="text-center text-gray-500">
                  No search history yet
                </p>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
