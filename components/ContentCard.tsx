import { LightbulbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  icon?: boolean;
  number?: number;
  accent?: boolean;
}

const ContentCard = ({ title, children, icon = false, number, accent = false }: ContentCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-card/70 p-8 shadow-glow border border-border/60">
      {accent && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff9a62] via-[#ff6fd8] to-[#8b5cf6]" />
      )}
      <div className="flex items-start gap-4">
        {number && (
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-base font-bold text-primary-foreground">
              {number}
            </div>
          </div>
        )}
        {icon && (
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white">
              <LightbulbIcon className="h-4 w-4" />
            </div>
          </div>
        )}
        <div className="flex-1">
          <h3 className="mb-4 text-xl font-semibold text-primary">{title}</h3>
          <div className="space-y-4 text-foreground leading-relaxed text-base">{children}</div>
        </div>
      </div>
    </Card>
  );
};

export default ContentCard;
