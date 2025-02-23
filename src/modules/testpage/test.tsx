import { testsConfig } from "@/config/tests.config";
import Link from "next/link";

export function TestsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testsConfig.map((test) => (
        <div
          key={test.id}
          className="rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{test.subject}</h2>
            <span
              className={`rounded-full px-3 py-1 text-sm ${
                test.difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : test.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {test.difficulty}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            {test.topic}
          </h3>
          <p className="mb-4 text-gray-600">{test.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Duration: {test.duration} minutes
            </span>
            <Link
              href={`/tests/${test.id}`}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Start Test
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
