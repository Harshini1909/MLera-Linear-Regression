import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <p className="text-sm text-muted-foreground mb-2">
        Module progress: {current} / {total}
      </p>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressBar;
