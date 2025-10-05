import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InspirationCarousel } from "@/components/InspirationCarousel";
import { BookOpen, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate an infographic.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Navigate to loading screen
    navigate('/loading');
    
    try {
      // Call the edge function to generate infographic
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-infographic`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ topic }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate infographic');
      }

      const data = await response.json();
      
      // Navigate to results with the generated image
      navigate('/results', { 
        state: { 
          imageUrl: data.imageUrl,
          topic: topic 
        } 
      });
    } catch (error) {
      console.error('Error generating infographic:', error);
      navigate('/');
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate infographic. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 px-4 py-12">
      <div className="max-w-3xl w-full space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-strong mb-4 animate-float">
            <BookOpen className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient">
            EduGraphic
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform complex topics into simple, beautiful infographics. 
            Perfect for studying, presentations, and visual learning.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6 glass-card p-8 shadow-medium">
          <div className="space-y-3">
            <label htmlFor="topic-input" className="block text-sm font-semibold text-foreground">
              What would you like to learn about?
            </label>
            <Input
              id="topic-input"
              type="text"
              placeholder="e.g., The Carbon Cycle, Types of Triangles, Photosynthesis..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-lg py-6 border-2 focus:border-primary transition-colors"
              disabled={isGenerating}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-lg py-6 shadow-medium hover:shadow-strong transition-all gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate Infographic
          </Button>
        </div>

        {/* Inspiration Section */}
        <InspirationCarousel onTopicSelect={handleTopicSelect} />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <div className="glass-card p-6 text-center space-y-2 hover-lift">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-foreground">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Generate beautiful infographics in seconds
            </p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-2 hover-lift">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-foreground">Visual Learning</h3>
            <p className="text-sm text-muted-foreground">
              Complex topics made simple and memorable
            </p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-2 hover-lift">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-foreground">Share & Download</h3>
            <p className="text-sm text-muted-foreground">
              Save to your device or share with friends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
