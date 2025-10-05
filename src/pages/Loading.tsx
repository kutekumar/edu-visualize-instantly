import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import Footer from "@/components/Footer";

const loadingMessages = [
  "Brewing knowledge soup...",
  "Untangling the facts...",
  "Translating ideas into visual awesomeness...",
  "Painting concepts with pixels...",
  "Connecting the dots...",
  "Crafting your infographic masterpiece...",
  "Sprinkling some educational magic...",
];

const educationalFacts = [
  "The brain processes images 60,000x faster than text.",
  "Visual information is processed 60% faster than textual information.",
  "People remember 80% of what they see and do.",
  "40% of people respond better to visual information than plain text.",
  "The brain can identify images seen for as little as 13 milliseconds.",
  "Visual aids improve learning by up to 400%.",
  "Colored visuals increase willingness to read by 80%.",
];

const Loading = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % educationalFacts.length);
    }, 4500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/5 px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-12">
          {/* Animated Lightbulb */}
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse-glow"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Lightbulb className="w-20 h-20 text-primary animate-fill" strokeWidth={2.5} />
            </div>
            {/* Rotating circles */}
            <div className="absolute inset-0 animate-rotate">
              <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-accent rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Loading Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold text-gradient animate-fade-in">
              {loadingMessages[messageIndex]}
            </h2>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse" 
                   style={{ width: '70%' }}></div>
            </div>
          </div>

          {/* Educational Fact */}
          <div className="glass-card p-6 max-w-lg mx-auto animate-fade-in">
            <p className="text-xs font-semibold text-accent mb-2">DID YOU KNOW?</p>
            <p className="text-base text-foreground/80 leading-relaxed">
              {educationalFacts[factIndex]}
            </p>
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Loading;
