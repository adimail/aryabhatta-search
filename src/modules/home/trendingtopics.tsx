import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TrendingTopics = () => {
  return (
    <section className="mb-20 md:mt-56">
      <h3 className="mb-6 text-2xl font-semibold">Trending Topics</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Mathematics Fundamentals</CardTitle>
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
    </section>
  );
};
