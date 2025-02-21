export const SearchResults = ({ query }: { query: string }) => {
  // Mock results - in a real app, this would come from an API
  const mockResults = [
    {
      title: "Introduction to " + query,
      type: "Course",
      description: "A comprehensive guide to understanding " + query,
    },
    {
      title: "Advanced " + query + " Studies",
      type: "Research Paper",
      description: "Latest research and findings in " + query,
    },
    {
      title: query + " for Beginners",
      type: "Article",
      description: "Getting started with " + query + " fundamentals",
    },
  ];

  return (
    <div className="mt-5 w-full space-y-4">
      <div className="rounded-lg border p-4">
        <p className="mb-4 text-gray-600">
          Showing {mockResults.length} results for &quot;{query}&quot;
        </p>
        <div className="space-y-4">
          {mockResults.map((result, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 hover:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-600">
                  {result.title}
                </h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {result.type}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{result.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
