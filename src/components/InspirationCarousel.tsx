import { InspirationCard } from "./InspirationCard";

interface InspirationCarouselProps {
  onTopicSelect: (topic: string) => void;
}

const inspirationTopics = [
  "Photosynthesis",
  "Causes of the Cold War",
  "The Water Cycle",
  "Types of Triangles",
  "The French Revolution",
  "Cell Division",
  "Shakespeare's Tragedies",
  "The Solar System",
  "World War II Timeline",
  "Chemical Bonding",
  "The Human Digestive System",
  "Ancient Greek Democracy",
];

export const InspirationCarousel = ({ onTopicSelect }: InspirationCarouselProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
        Or choose from popular topics
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {inspirationTopics.map((topic) => (
          <InspirationCard
            key={topic}
            topic={topic}
            onClick={() => onTopicSelect(topic)}
          />
        ))}
      </div>
    </div>
  );
};
