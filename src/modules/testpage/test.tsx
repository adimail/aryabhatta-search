"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle } from "@/components/ui/card";


export const TestPage = () => {
    const [topic, setTopic] = useState("");

    return (
        <div className="flex flex-col items-center justify-center  p-4" >
            <Card className="w-full max-w-md" >
                <CardContent className="p-6" >
                    <h2 className="text-2xl font-bold mb-4" > Take a Test </h2>

                    {/* Search Bar */}
                    <div className="flex gap-2 mb-6" >
                        <Input
                            type="text"
                            placeholder="Search test topics..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <Button > Search </Button>
                    </div>
                </CardContent>
            </Card>
            <br></br>
            {/* Empty Cards for AI-based Suggestions */}
            <h3 className="mb-6 text-2xl font-semibold">Suggested Topics</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>"Mathematics Fundamentals"</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Advanced Calculus: Comprehensive guide to differential equations
                            and complex analysis
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Computer Science</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Machine Learning Basics: Introduction to AI and machine learning
                            algorithms
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Biology</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Cellular Biology: Explore the fundamentals of cell structure and
                            function
                        </p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};
