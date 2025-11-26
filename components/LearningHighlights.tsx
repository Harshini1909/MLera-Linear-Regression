const highlightCards = [
  {
    title: "Concept Clarity",
    stat: "12 micro-lessons",
    description: "Structured storyline that ties intuition, math, and code together.",
    badge: "Theory Track",
  },
  {
    title: "Hands-on Practice",
    stat: "3 interactive labs",
    description: "Tweak parameters and visualize gradient descent in real time.",
    badge: "Builder Track",
  },
  {
    title: "Reflection & Recall",
    stat: "8 flash prompts",
    description: "Lightweight quizzes and prompts that keep the narrative sticky.",
    badge: "Retention Track",
  },
];

const journeySteps = [
  {
    label: "Explore",
    detail: "Watch the content storyline and collect intuition checkpoints.",
  },
  {
    label: "Build",
    detail: "Experiment with datasets, hyperparameters, and live cost curves.",
  },
  {
    label: "Reflect",
    detail: "Summarize insights, capture mistakes, and get ready for the quiz drop.",
  },
];

const LearningHighlights = () => {
  return (
    <section className="mx-auto mt-20 w-full max-w-6xl px-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {highlightCards.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-border/50 bg-card/70 p-6 shadow-glow transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_25px_60px_-30px_hsla(340,82%,62%,0.45)]"
          >
            <span className="inline-flex items-center rounded-full bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground/80">
              {card.badge}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-primary">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
            <p className="mt-6 text-3xl font-bold text-foreground">{card.stat}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-50" />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border/40 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent p-8 backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">MLera Edge</p>
            <h3 className="text-3xl font-semibold text-foreground">Your guided journey</h3>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            A tiny creative enhancement: this ribbon summarizes how the module flows so mentors can quickly see
            the value of each phase. Hover on each chip to view the micro-copy.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          {journeySteps.map((step, index) => (
            <div
              key={step.label}
              className="flex-1 rounded-xl border border-border/30 bg-background/70 p-5 transition duration-200 hover:border-primary/60 hover:bg-primary/5"
            >
              <p className="text-sm font-semibold text-primary">
                {index + 1}. {step.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningHighlights;

