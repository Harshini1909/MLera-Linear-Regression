import Link from "next/link";

import { Button } from "@/components/ui/button";
import LearningHighlights from "@/components/LearningHighlights";

export default function HomePage() {
  return (
    <>
      <section className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Linear Regression · Interactive Module
        </p>
        <h1 className="max-w-4xl bg-gradient-primary bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
          Making machine learning education intuitive, visual, and fun.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Relearn linear regression with an MLera storyline. Switch themes, explore the content path, and build a model
          that reacts to every parameter you tweak.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild className="bg-gradient-primary px-10 py-6 text-base text-white shadow-lg shadow-primary/30">
            <Link href="/content">Start Learning</Link>
          </Button>
          <Button asChild variant="outline" className="px-10 py-6 text-base">
            <Link href="/build">Build a Model</Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-6 text-left sm:grid-cols-3">
          {[
            { label: "Runtime exercises", value: "3 interactive labs" },
            { label: "Reading time", value: "~18 minutes of content" },
            { label: "Dark / light state", value: "Persists across pages & reloads" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border/60 bg-card/60 p-4 text-sm">
              <p className="text-muted-foreground">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
      <LearningHighlights />
    </>
  );
}

