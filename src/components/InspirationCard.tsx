import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface InspirationCardProps {
  topic: string;
  onClick: () => void;
}

export const InspirationCard = ({ topic, onClick }: InspirationCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="flex-shrink-0 w-48 p-4 glass-card hover-lift cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-colors">
          <Lightbulb className="w-5 h-5 text-accent" />
        </div>
        <p className="text-sm font-medium text-foreground leading-snug flex-1">
          {topic}
        </p>
      </div>
    </Card>
  );
};
