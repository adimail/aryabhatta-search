/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { testsConfig } from "@/config/tests.config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TestPage({ params }: { params: { testid: string } }) {
  const router = useRouter();
  const test = testsConfig.find((test) => test.id === params.testid);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);

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

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    test.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/tests"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tests
        </Link>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>{test.duration} minutes</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{test.subject}</h1>
        <div className="mt-2 flex items-center gap-4">
          <h2 className="text-xl text-gray-600">{test.topic}</h2>
          <Badge
            variant={
              test.difficulty === "Easy"
                ? "secondary"
                : test.difficulty === "Medium"
                  ? "outline"
                  : "destructive"
            }
          >
            {test.difficulty}
          </Badge>
        </div>
        <p className="mt-4 text-gray-600">{test.description}</p>
      </div>

      <div className="space-y-8">
        {test.questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Question {index + 1}: {question.question}
              </h3>
            </div>
            <RadioGroup
              value={selectedAnswers[question.id]}
              onValueChange={(value) => handleAnswerSelect(question.id, value)}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-50 ${
                    showResults &&
                    option === question.correctAnswer &&
                    "bg-green-50"
                  } ${
                    showResults &&
                    selectedAnswers[question.id] === option &&
                    option !== question.correctAnswer &&
                    "bg-red-50"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`${question.id}-${option}`}
                  />
                  <Label
                    htmlFor={`${question.id}-${option}`}
                    className="w-full cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {showResults && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="font-semibold">Explanation:</p>
                <p className="text-gray-600">{question.explanation}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        {!showResults ? (
          <Button onClick={handleSubmit} size="lg">
            Submit Test
          </Button>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-xl">
              Your Score: {calculateScore()} out of {test.questions.length}
            </p>
            <Button onClick={() => router.push("/tests")} size="lg">
              Back to Tests
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
