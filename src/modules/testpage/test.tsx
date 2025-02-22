"use client";
import React from "react";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MathFundamentalsCard() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "What is the derivative of sin(x)?",
            options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
            correct: "cos(x)"
        },
        {
            id: 2,
            question: "Which equation represents a second-order differential equation?",
            options: ["y' + y = 0", "y'' + 3y' + 2y = 0", "y + 3 = 0", "dy/dx = x + y"],
            correct: "y'' + 3y' + 2y = 0"
        },
        {
            id: 3,
            question: "What is the integral of e^x?",
            options: ["e^x + C", "x e^x", "e^x / x", "ln(x)"],
            correct: "e^x + C"
        },
        {
            id: 4,
            question: "Which of the following is a Laplace transform of 1?",
            options: ["1/s", "s", "e^s", "ln(s)"],
            correct: "1/s"
        },
        {
            id: 5,
            question: "What is the Taylor series expansion of e^x at x = 0?",
            options: ["1 + x + x^2/2! + x^3/3! + ...", "x + x^2/2 + x^3/3 + ...", "x^2 + x^4/2! + x^6/3! + ...", "1 - x + x^2 - x^3 + ..."],
            correct: "1 + x + x^2/2! + x^3/3! + ..."
        }
    ];

    const handleSelect = (id: number, option: string) => {
        setAnswers(prev => ({ ...prev, [id]: option }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) newScore += 1;
        });
        setScore(newScore);
        setSubmitted(true);
    };

    return (
        <div className="p-4">
            <Card onClick={() => setShowQuiz(true)} className="cursor-pointer">
                <CardHeader>
                    <CardTitle>Mathematics Fundamentals</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">Advanced Calculus: Comprehensive guide to differential equations and complex analysis</p>
                </CardContent>
            </Card>

            {showQuiz && (
                <div className="mt-4 p-4 border rounded-lg">
                    {questions.map((q) => (
                        <div key={q.id} className="mb-4">
                            <p className="font-semibold">{q.question}</p>
                            {q.options.map((opt) => (
                                <label key={opt} className="block">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt}
                                        onChange={() => handleSelect(q.id, opt)}
                                        disabled={submitted}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ))}
                    {!submitted && (
                        <Button onClick={handleSubmit}>Submit</Button>
                    )}
                    {submitted && (
                        <div className="mt-4">
                            <p className="font-semibold">Score: {score} / {questions.length}</p>
                            {questions.map(q => (
                                <p key={q.id} className={`mt-2 ${answers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                                    {answers[q.id] !== q.correct && <span>Correct Answer: {q.correct}</span>}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
