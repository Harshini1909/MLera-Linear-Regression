 "use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Scatter, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { ChevronLeft, LightbulbIcon } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";

import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Learning Path", href: "/content" },
  { label: "Linear Regression", isCurrent: true },
];

const studyHoursData = [
  { hours: 1, score: 52 },
  { hours: 2, score: 57 },
  { hours: 3, score: 63 },
  { hours: 4, score: 70 },
  { hours: 5, score: 76 },
  { hours: 6, score: 82 },
  { hours: 7, score: 88 },
  { hours: 8, score: 93 },
];

const bestFitPreview = studyHoursData.map((point) => ({
  hours: point.hours,
  actual: point.score,
  best: 45 + 6.5 * point.hours,
}));

export default function ContentPage() {
  const [intercept, setIntercept] = useState(20);
  const [slope, setSlope] = useState(3);

  const visualizerData = useMemo(
    () =>
      studyHoursData.map((point) => ({
        hours: point.hours,
        actual: point.score,
        predicted: intercept + slope * point.hours,
      })),
    [intercept, slope],
  );

  const mse = useMemo(() => {
    const total = visualizerData.reduce((sum, datapoint) => sum + Math.pow(datapoint.actual - datapoint.predicted, 2), 0);
    return total / visualizerData.length;
  }, [visualizerData]);

  return (
    <div className="container mx-auto max-w-6xl px-6 py-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-5xl font-bold tracking-tight text-primary/90">Introduction to Linear Regression</h1>
        <Button
          asChild
          variant="outline"
          className="gap-2 border-primary/30 text-sm font-semibold uppercase tracking-wide hover:bg-primary/10 lg:text-base"
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Module</span>
          </Link>
        </Button>
      </div>

      <ProgressBar current={2} total={5} />

      <div className="space-y-8">
        <ContentCard title="What is Linear Regression?" number={1} accent>
          <p>
            Linear Regression is one of the most fundamental and widely used techniques in the field of machine learning
            and statistics. It models the relationship between a{" "}
            <span className="font-semibold text-primary">dependent variable</span> (Y) and one or more{" "}
            <span className="font-semibold text-accent">independent variables</span> (X) by fitting a straight line to
            the observed data.
          </p>
          <p>
            Once the line is fitted, we can explain existing observations and make predictions for new inputs with
            minimal effort.
          </p>
          <div className="mt-6 rounded-2xl border border-[#6b3ccf]/60 bg-[#1d1235]/80 p-5">
            <div className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-primary">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#ff8f6b] to-[#ff6fd8] text-base text-white">
                <LightbulbIcon className="h-4 w-4" />
              </span>
              Definition
            </div>
            <p className="text-sm text-muted-foreground">
              Linear Regression is a <span className="font-semibold text-accent">supervised learning</span> algorithm
              that predicts a continuous output value based on one or more input{" "}
              <span className="font-semibold text-primary">features</span>, assuming a linear relationship between the
              inputs and the output.
            </p>
          </div>
        </ContentCard>

        <ContentCard title="Mathematical Formulation" number={2} accent>
          <p>The simplest form (Simple Linear Regression) can be expressed as:</p>
          <div className="my-5 rounded-2xl border border-[#7a4de2]/60 bg-[#1b1030]/80 px-8 py-6 text-center text-[#ff815a]">
            <BlockMath math="\hat{y} = \beta_0 + \beta_1 x + \varepsilon" />
          </div>
          <p className="font-semibold text-primary">Where:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="text-accent">→</span> ŷ — predicted output value.
            </li>
            <li>
              <span className="text-accent">→</span> x — input feature.
            </li>
            <li>
              <span className="text-accent">→</span> β₀ — intercept (value when x = 0).
            </li>
            <li>
              <span className="text-accent">→</span> β₁ — slope (change in ŷ for each unit change in x).
            </li>
            <li>
              <span className="text-accent">→</span> ε — error term capturing what the line cannot explain.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl border border-[#ff7aa2]/60 bg-[#2a1134]/70 px-6 py-5 text-sm leading-relaxed text-white/90">
            The goal of Linear Regression is to find the values of β₀ and β₁ that minimize the sum of squared differences
            between the actual Y values and the values predicted by our model.
          </div>
        </ContentCard>

        <ContentCard title="Intuition behind LR" number={3} accent>
          <p>
            Imagine plotting study hours versus exam scores. Each point represents a student. Linear Regression finds the
            straight line that best explains this relationship, allowing us to estimate scores for any number of hours.
          </p>
          <div className="mt-6 rounded-2xl border border-[#6b3ccf]/50 bg-[#170b28]/80">
            <div className="rounded-t-2xl bg-gradient-to-r from-[#ff9a62] via-[#ff6fd8] to-[#8b5cf6] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white">
              Relationship Between Study Hours and Exam Scores
            </div>
            <div className="px-4 pb-6 pt-4">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={bestFitPreview} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3a2269" />
                  <XAxis
                    dataKey="hours"
                    stroke="#dac9ff"
                    label={{ value: "Study Hours", dy: 12, fill: "#dac9ff", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#dac9ff"
                    label={{ value: "Exam Score", angle: -90, dx: -12, fill: "#dac9ff", fontSize: 12 }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "#1b0f2f",
                      border: "1px solid #6b3ccf",
                      borderRadius: "0.75rem",
                      color: "#fff",
                    }}
                  />
                  <Scatter dataKey="actual" fill="#53b4ff" name="Student Data" />
                  <Line type="monotone" dataKey="best" stroke="#ff6f91" strokeWidth={3} name="Best Fit Line" dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              In the visualization above, each point represents a student’s study hours (x-axis) and their exam score
              (y-axis). The straight line is the <span className="text-accent font-semibold">best fit</span> determined by
              Linear Regression, which minimizes the overall distance between the line and all data points.
            </p>
            <p>
              If we know this relationship, we can make predictions. For example, if a student studies for 6 hours, we can
              use our regression line to predict their likely exam score.
            </p>
            <p>
              Our goal in linear regression is to find the values of β₀ and β₁ that “best fit” our data. But what does
              “best fit” mean mathematically? That’s where the cost function comes in.
            </p>
          </div>
        </ContentCard>

        <ContentCard title="Understanding the Cost Function (MSE)" number={4} accent>
          <p>
            To find the best-fitting line, we need a way to measure how well any given line fits our data. The cost
            function quantifies how “wrong” our model’s predictions are compared to the actual values. In linear regression,
            we typically use the Mean Squared Error (MSE) as our cost function.
          </p>
          <div className="my-4 rounded-2xl border border-[#7a4de2]/60 bg-[#1b1030]/80 px-8 py-6 text-center text-[#ff815a]">
            <BlockMath math="MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2" />
          </div>
          <p className="mt-4 font-semibold text-primary">Where:</p>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="text-accent">→</span> n — number of observations.
            </li>
            <li>
              <span className="text-accent">→</span> yᵢ — actual value of the dependent variable for observation i.
            </li>
            <li>
              <span className="text-accent">→</span> ŷᵢ — predicted value for observation i.
            </li>
          </ul>
          <div className="my-5 rounded-2xl border border-[#ff7aa2]/60 bg-[#2a1134]/70 px-8 py-6 text-center text-[#ff815a]">
            <BlockMath math="MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - (\beta_0 + \beta_1 x_i))^2" />
          </div>
          <p className="text-sm text-muted-foreground">
            We’ve defined the cost function (Mean Squared Error), the next step is to minimize this error by finding β₀
            and β₁. Two techniques often used:
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm text-white">
            <li>Ordinary Least Squares (OLS)</li>
            <li>Gradient Descent</li>
          </ol>
        </ContentCard>

        <ContentCard title="Ordinary Least Square (OLS)" number={5} accent>
          <p>
            OLS is a closed-form analytical solution derived by differentiating the cost function and setting the derivatives to zero.
            It gives a direct formula to compute the best-fitting line without iteration.
          </p>
          <div className="my-4 space-y-4 rounded-2xl border border-[#6b3ccf]/50 bg-[#170b28]/80 p-6 text-center text-white">
            <BlockMath math="\beta_1 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2} = \frac{\text{Cov}(x, y)}{\text{Var}(x)}" />
            <BlockMath math="\beta_0 = \bar{y} - \beta_1 \bar{x}" />
          </div>
          <p className="text-sm text-muted-foreground">
            where x̄ and ȳ are the means of the x and y values respectively.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/40 bg-[#1E1A36]/40 p-6">
              <p className="font-semibold text-primary">Pros</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>✔ Fast and exact.</li>
                <li>✔ Best for small to medium datasets.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/40 bg-[#2B1E2B]/40 p-6">
              <p className="font-semibold text-accent">Cons</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>⚠ Not ideal for high-dimensional data.</li>
                <li>✖ Becomes computationally expensive with large data.</li>
              </ul>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Gradient Descent" number={6} accent>
          <p>
            Gradient Descent is an iterative optimization algorithm. It starts with random initial values for β₀ and β₁ and
            gradually updates them to minimize the cost.
          </p>
          <div className="my-6 space-y-3 rounded-2xl border border-[#6b3ccf]/50 bg-[#170b28]/80 p-6 text-center text-white">
            <BlockMath math="\beta_1 := \beta_1 - \alpha \cdot \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i) x_i" />
            <BlockMath math="\beta_0 := \beta_0 - \alpha \cdot \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)" />
          </div>
          <p className="font-semibold text-primary">Where:</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <span className="text-accent">→</span> α is the learning rate (step size).
            </li>
            <li>
              <span className="text-accent">→</span> m is the number of training examples.
            </li>
            <li>
              <span className="text-accent">→</span> ŷᵢ is the predicted value for the i-th example.
            </li>
            <li>
              <span className="text-accent">→</span> yᵢ is the actual value for the i-th example.
            </li>
            <li>
              <span className="text-accent">→</span> xᵢ is the feature value for the i-th example.
            </li>
          </ul>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/40 bg-[#1E1F36]/40 p-6">
              <p className="font-semibold text-primary">Pros</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>✔ Scales well to large datasets and high dimensions.</li>
                <li>✔ Allows for online learning (data coming in streams).</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/40 bg-[#2A1D2F]/40 p-6">
              <p className="font-semibold text-accent">Cons</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>⚠ Requires tuning of the learning rate.</li>
                <li>✖ May get stuck in local minima if α is poorly chosen.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border/40 bg-secondary/10 p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">Intuitive Explanation</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Look around to find the steepest downward direction (gradient).</li>
              <li>Take a step in that direction (parameter update).</li>
              <li>Repeat until you reach the valley floor (convergence).</li>
            </ol>
          </div>
        </ContentCard>

        <ContentCard title="Visual Representation" number={7} accent>
          <p>Let’s explore how changing the intercept and slope affects our regression line:</p>
          <div className="mt-6 rounded-2xl border border-[#6b3ccf]/50 bg-[#170b28]/80">
            <div className="rounded-t-2xl bg-gradient-to-r from-[#ff9a62] via-[#ff6fd8] to-[#8b5cf6] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white">
              Adjust the Intercept and Slope to Fit the Data
            </div>
            <div className="px-4 pb-6 pt-4">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={visualizerData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3a2269" />
                  <XAxis
                    dataKey="hours"
                    stroke="#dac9ff"
                    label={{ value: "Study Hours", dy: 12, fill: "#dac9ff", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#dac9ff"
                    label={{ value: "Exam Score", angle: -90, dx: -12, fill: "#dac9ff", fontSize: 12 }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "#1b0f2f",
                      border: "1px solid #6b3ccf",
                      borderRadius: "0.75rem",
                      color: "#fff",
                    }}
                  />
                  <Scatter dataKey="actual" fill="#53b4ff" name="Student Scores" />
                  <Line type="monotone" dataKey="predicted" stroke="#ff6f91" strokeWidth={3} name="Your Regression Line" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <span>Intercept (β₀)</span>
                <span className="text-primary">{intercept}</span>
              </div>
              <Slider
                className="mt-3"
                min={0}
                max={60}
                step={1}
                value={[intercept]}
                onValueChange={(value) => setIntercept(value[0])}
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <span>Slope (β₁)</span>
                <span className="text-primary">{slope}</span>
              </div>
              <Slider
                className="mt-3"
                min={0}
                max={12}
                step={0.5}
                value={[slope]}
                onValueChange={(value) => setSlope(value[0])}
              />
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[#6b3ccf]/50 bg-[#150b26]/90 p-4 text-center text-lg font-semibold text-white">
            Mean Squared Error: <span className="text-accent">{mse.toFixed(2)}</span>
          </div>

          <div className="mt-6 rounded-2xl border border-[#6b3ccf]/40 bg-secondary/10 p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">As you adjust the sliders, observe how the regression line changes:</p>
            <ul className="mt-3 space-y-2">
              <li>• The intercept moves the line up or down (where it crosses the y-axis).</li>
              <li>• The slope changes how steep the line is (positive slopes go up, negative slopes go down).</li>
            </ul>
            <p className="mt-4 font-semibold text-accent">
              Notice that some lines fit the data better than others. The best line is the one that minimizes the total error between the line and the actual data points.
            </p>
          </div>
        </ContentCard>

        <div className="mt-12 rounded-2xl border border-border/40 bg-card/60 p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Coming up next</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4 className="text-2xl font-bold text-primary">Build a Linear Regression Model</h4>
              <p className="text-muted-foreground">
                Now that the theory is clear, head to the builder to train a live model.
              </p>
            </div>
            <Button asChild className="bg-gradient-primary px-10 py-6 text-lg font-semibold text-white shadow-glow">
              <Link href="/build">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

