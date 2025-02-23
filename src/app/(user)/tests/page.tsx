import { TestsCards } from "@/modules/testpage/test";

export default function TestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Available Tests</h1>
      <TestsCards />
    </div>
  );
}
