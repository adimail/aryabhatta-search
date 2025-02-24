import { testsConfig } from "@/config/tests.config";
import TestContent from "./test-content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: {
    testid: string;
  };
};

export default async function TestPage({ params }: Props) {
  const { testid } = params;
  const test = testsConfig.find((test) => test.id === testid);

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Test not found</h1>
        <Link
          href="/tests"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tests
        </Link>
      </div>
    );
  }

  return <TestContent test={test} />;
}
