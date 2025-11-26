"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const datasets = {
  sales: {
    name: "Sales Revenue",
    description:
      "Relationship between marketing budget (in thousands of dollars) and sales revenue. Great for showcasing a positive business correlation.",
    xLabel: "Marketing Budget (thousands $)",
    yLabel: "Sales Revenue (thousands $)",
    data: [
      { x: 10, y: 120 },
      { x: 20, y: 140 },
      { x: 30, y: 165 },
      { x: 40, y: 180 },
      { x: 50, y: 210 },
      { x: 60, y: 220 },
      { x: 70, y: 240 },
      { x: 80, y: 250 },
    ],
  },
  housing: {
    name: "Housing Prices",
    description:
      "Relationship between house size (square feet) and price (thousands of dollars). Perfect for explaining value appreciation.",
    xLabel: "House Size (sq ft)",
    yLabel: "Price (thousands $)",
    data: [
      { x: 1000, y: 200 },
      { x: 1500, y: 280 },
      { x: 2000, y: 350 },
      { x: 2500, y: 420 },
      { x: 3000, y: 480 },
      { x: 3500, y: 550 },
    ],
  },
  salary: {
    name: "Salary vs Experience",
    description:
      "Relationship between years of experience and annual salary. Highlights how skill accumulation compounds earnings.",
    xLabel: "Years of Experience",
    yLabel: "Salary ($)",
    data: [
      { x: 2, y: 40000 },
      { x: 3, y: 45000 },
      { x: 4, y: 48000 },
      { x: 5, y: 50000 },
      { x: 6, y: 55000 },
      { x: 7, y: 60000 },
      { x: 8, y: 65000 },
    ],
  },
};

const datasetModels = {
  sales: { intercept: 75, slope: 1.8 },
  housing: { intercept: -20, slope: 0.2 },
  salary: { intercept: 15000, slope: 6000 },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Modules", href: "/content" },
  { label: "Build Linear Regression", isCurrent: true },
];

export default function BuildPage() {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof datasets>("sales");
  const [modelDatasetChoice, setModelDatasetChoice] = useState<keyof typeof datasets>("sales");
  const [modelDataset, setModelDataset] = useState<keyof typeof datasets>("sales");
  const [learningRate, setLearningRate] = useState(0.05);
  const [iterations, setIterations] = useState(100);
  const [currentIteration, setCurrentIteration] = useState(10);
  const [modelBuilt, setModelBuilt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && currentIteration < iterations) {
      interval = setInterval(() => {
        setCurrentIteration((prev) => {
          if (prev >= iterations) {
            setIsPlaying(false);
            return iterations;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIteration, iterations]);

  const handleBuildModel = () => {
    setModelBuilt(true);
    setCurrentIteration(10);
    setIsPlaying(false);
    setModelDataset(modelDatasetChoice);
  };

  const handleReset = () => {
    setModelBuilt(false);
    setCurrentIteration(10);
    setIsPlaying(false);
  };

  const costData = useMemo(
    () =>
      Array.from({ length: Math.ceil(currentIteration / 10) }, (_, i) => ({
        iteration: (i + 1) * 10,
        cost: 100 * Math.exp(-i * 0.25) + Math.random() * 3,
      })),
    [currentIteration],
  );

  const dataset = datasets[selectedDataset];
  const builtDataset = datasets[modelDataset];
  const targetModel = datasetModels[modelDataset];
  const progressRatio = modelBuilt ? currentIteration / iterations : 0;

  const regressionLineData = useMemo(() => {
    const startSlope = 0.4 * targetModel.slope;
    const slope = startSlope + (targetModel.slope - startSlope) * progressRatio;
    const interceptValue = targetModel.intercept * progressRatio;
    return builtDataset.data.map((point) => ({
      x: point.x,
      y: interceptValue + slope * point.x,
    }));
  }, [builtDataset.data, progressRatio, targetModel.intercept, targetModel.slope]);

  const parameterCostData = useMemo(
    () =>
      costData.map((point, idx) => ({
        parameter: Number((0.02 * (idx + 1)).toFixed(2)),
        cost: Number((point.cost / 100).toFixed(3)),
      })),
    [costData],
  );

  return (
    <div className="container mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-5xl font-bold uppercase tracking-tight text-primary/90">Build A Linear Regression Model</h1>
        <Button
          asChild
          variant="outline"
          className="gap-2 border-primary/30 text-sm font-semibold uppercase tracking-wide hover:bg-primary/10 lg:text-base"
        >
          <Link href="/content">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Content</span>
          </Link>
        </Button>
      </div>

      <ProgressBar current={3} total={5} />

      <div className="space-y-8">
        <ContentCard title="Lets Build The Model" number={1} accent>
          <p>
            In this interactive module, you&apos;ll build a linear regression model using different datasets. Select a dataset,
            adjust the learning rate and number of iterations, then click &quot;Build&quot;. Watch how the model converges as you
            navigate through the training process.
          </p>
        </ContentCard>

        <ContentCard title="Visualizing the Relationship" number={2} accent>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Select a Dataset
              </label>
              <Select value={selectedDataset} onValueChange={(val) => setSelectedDataset(val as keyof typeof datasets)}>
                <SelectTrigger className="w-full rounded-lg border border-[#6a3fbf]/60 bg-[#1b1032] text-base font-medium text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Revenue</SelectItem>
                  <SelectItem value="housing">Housing Prices</SelectItem>
                  <SelectItem value="salary">Salary vs Experience</SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-3 text-sm text-muted-foreground">
                Choose a dataset to see its scatter plot. This will help you understand the relationship between variables before building the model.
              </p>
            </div>

            <div className="rounded-2xl border border-[#6b3ccf]/60 bg-[#1d1336]/80 p-6 space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Dataset Description</p>
                  <h4 className="text-lg font-semibold uppercase tracking-wide text-primary">{dataset.name}</h4>
                  <p className="text-sm text-muted-foreground">{dataset.description}</p>
                </div>
                <Button
                  onClick={() => setShowTable((prev) => !prev)}
                  className="rounded-lg bg-[#ff6f91] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow hover:bg-[#ff5c86]"
                >
                  {showTable ? "Hide Dataset Table" : "View Dataset Table"}
                </Button>
              </div>

                <div className="mt-6 rounded-2xl border border-[#6b3ccf]/40 bg-[#251042]/80 p-4">
                  <h5 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                    {dataset.name} Preview
                  </h5>
                  <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3a2269" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name={dataset.xLabel}
                      label={{ value: dataset.xLabel, position: "bottom", offset: 0 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name={dataset.yLabel}
                      label={{ value: dataset.yLabel, angle: -90, position: "insideLeft" }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: "#1b0f2f",
                        border: "1px solid #6b3ccf",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Scatter data={dataset.data} fill="#5AD1FF" />
                    </ScatterChart>
                  </ResponsiveContainer>
              </div>

              {showTable && (
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowTable(false)}
                    className="w-full rounded-lg bg-[#a052f2] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#8c40d6]"
                  >
                    Hide Dataset Table
                  </Button>
                  <div className="overflow-x-auto rounded-2xl border border-[#6b3ccf]/40 bg-[#1c1035]/80">
                    <table className="w-full text-left text-sm text-white/90">
                      <thead className="bg-[#2c1152]/70 text-xs uppercase tracking-wide text-white">
                        <tr>
                          <th className="px-4 py-3 font-semibold">{dataset.xLabel}</th>
                          <th className="px-4 py-3 font-semibold">{dataset.yLabel}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataset.data.map((point, idx) => (
                          <tr key={idx} className="border-t border-[#3a2367]/60">
                            <td className="px-4 py-3">{point.x}</td>
                            <td className="px-4 py-3">{point.y}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Choose the Hyperparameters" number={3} accent>
          <div className="mb-6 overflow-hidden rounded-2xl border border-[#6b3ccf]/50 bg-[#1d1336]/80">
            <div className="grid grid-cols-3 bg-[#2c1152]/70 text-xs uppercase tracking-wide text-white">
              <div className="px-4 py-3">Learning Rate (α)</div>
              <div className="px-4 py-3">Iterations</div>
              <div className="px-4 py-3">Effect</div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-[#6b3ccf]/30 text-sm text-white/80">
              <div className="bg-[#1d1336]/95 px-4 py-3">0.001 - 0.005</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">300 - 500</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">Slow, stable convergence (complex data)</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">0.01 - 0.05</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">100 - 300</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">Balanced convergence (start here)</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">0.05 - 0.1</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">50 - 100</div>
              <div className="bg-[#1d1336]/95 px-4 py-3">Fast convergence, potential instability</div>
            </div>
            <p className="px-4 py-3 text-xs text-muted-foreground">
              Tip: If the cost plot oscillates, reduce the learning rate.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Dataset for Model
              </label>
              <Select value={modelDatasetChoice} onValueChange={(val) => setModelDatasetChoice(val as keyof typeof datasets)}>
                <SelectTrigger className="w-full rounded-lg border border-[#6a3fbf]/60 bg-[#1b1032] text-base font-medium text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Revenue</SelectItem>
                  <SelectItem value="housing">Housing Prices</SelectItem>
                  <SelectItem value="salary">Salary vs Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Learning Rate (α): {learningRate.toFixed(3)}
              </label>
              <Slider
                className="slider-pink [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-[#ff6f91]"
                value={[learningRate]}
                min={0.001}
                max={0.1}
                step={0.001}
                onValueChange={(value) => setLearningRate(value[0])}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Iterations: {iterations}
              </label>
              <Slider
                className="slider-pink [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-[#ff6f91]"
                value={[iterations]}
                min={50}
                max={500}
                step={10}
                onValueChange={(value) => setIterations(value[0])}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleBuildModel}
                className="rounded-lg bg-[#ff6f91] px-8 py-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#ff5c86]"
              >
                Build Model
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-lg border-[#ff6f91]/60 px-8 py-6 text-sm font-semibold uppercase tracking-wide text-[#ff6f91]"
              >
                Reset
              </Button>
            </div>
          </div>
        </ContentCard>

        <Card className="border border-[#6b3ccf]/60 bg-[#1b0f2f]/80 p-8 text-white shadow-glow space-y-6">
          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wide text-primary">Model&apos;s Growth</h3>
            <div className="mt-3 rounded-lg bg-[#2c1152]/80 px-4 py-3 text-sm text-white/80">
              {modelBuilt
                ? "Model built successfully. Use the controls to navigate through training."
                : "Select a dataset and parameters, then click “Build Model”."}
            </div>
          </div>
          {modelBuilt ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wide">
                <Button
                  className="rounded-lg bg-[#ff6f91] px-5 py-4 text-white disabled:opacity-50"
                  onClick={() => setCurrentIteration((prev) => Math.max(10, prev - 10))}
                  disabled={currentIteration <= 10}
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
                    <span>Progress</span>
                    <span className="font-mono text-base text-white">
                      {currentIteration}/{iterations}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-[#3c1a63]">
                    <div
                      className="h-full rounded-full bg-[#ff6f91]"
                      style={{ width: `${(currentIteration / iterations) * 100}%` }}
                    />
                  </div>
                </div>
                <Button
                  className="rounded-lg bg-[#ff6f91] px-5 py-4 text-white disabled:opacity-50"
                  onClick={() => setCurrentIteration((prev) => Math.min(iterations, prev + 10))}
                  disabled={currentIteration >= iterations}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  className="rounded-lg bg-[#ff6f91] px-5 py-4 text-white disabled:opacity-50"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  disabled={currentIteration >= iterations}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Play
                    </>
                  )}
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#6b3ccf]/40 bg-[#1d1336]/80 p-4">
                  <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                    Linear Regression Model (Iteration {currentIteration})
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }} data={regressionLineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#31124f" />
                      <XAxis type="number" dataKey="x" stroke="#b8a6d9" />
                      <YAxis type="number" dataKey="y" stroke="#b8a6d9" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1b0f2f",
                          border: "1px solid #6b3ccf",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Scatter data={builtDataset.data} fill="#5ad1ff" name="Data Points" />
                      <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#ff6f91"
                        strokeWidth={3}
                        dot={false}
                        name="Best Fit Line"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-2xl border border-[#6b3ccf]/40 bg-[#1d1336]/80 p-4">
                  <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                    Parameter β vs Cost
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={parameterCostData} margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#31124f" />
                      <XAxis dataKey="parameter" label={{ value: "Parameter (β)", position: "bottom", offset: 0 }} stroke="#b8a6d9" />
                      <YAxis label={{ value: "Cost", angle: -90, position: "insideLeft" }} stroke="#b8a6d9" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1b0f2f",
                          border: "1px solid #6b3ccf",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Line type="monotone" dataKey="cost" stroke="#5ad1ff" strokeWidth={3} dot={{ fill: "#5ad1ff", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-[#2c1152]/70 px-4 py-3 text-sm text-white/80">
                Select a dataset and parameters, then click &quot;Build Model&quot; to preview the training process.
              </div>
              <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
                <div className="rounded-2xl border border-[#6b3ccf]/40 bg-[#20103a]/80 p-4">
                  <ResponsiveContainer width="100%" height={240}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#31124f" />
                      <XAxis dataKey="x" stroke="#4f347d" />
                      <YAxis dataKey="y" stroke="#4f347d" />
                    </ScatterChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-center">Linear Regression Model — build to see results.</p>
                </div>
                <div className="rounded-2xl border border-[#6b3ccf]/40 bg-[#20103a]/80 p-4">
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={[{ parameter: 0, cost: 1 }, { parameter: 1, cost: 0.6 }, { parameter: 2, cost: 0.4 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#31124f" />
                      <XAxis dataKey="parameter" stroke="#4f347d" />
                      <YAxis dataKey="cost" stroke="#4f347d" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-center">Parameter vs Cost — build to see results.</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-12 rounded-2xl border border-[#6b3ccf]/40 bg-[#1d1336]/80 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Coming Up Next</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4 className="text-2xl font-bold text-primary">Quiz on Linear Regression</h4>
              <p className="text-muted-foreground">
                Here&apos;s a short quiz to follow your interactive model page.
              </p>
            </div>
            <Button className="rounded-lg bg-[#ff6f91] px-10 py-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#ff5c86]">
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

