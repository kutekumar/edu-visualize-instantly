import { Button } from "@/components/ui/button";
import { Download, Share2, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { imageUrl, topic } = location.state || {};

  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `edugraphic-${topic?.toLowerCase().replace(/\s+/g, '-') || 'infographic'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "Your infographic has been saved to your device.",
    });
  };

  const handleShare = async () => {
    if (!imageUrl) return;

    if (navigator.share) {
      try {
        // Convert base64 to blob for sharing
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `edugraphic-${topic}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: 'EduGraphic Infographic',
          text: `Check out this infographic about ${topic}!`,
          files: [file],
        });
        
        toast({
          title: "Shared!",
          description: "Thanks for sharing your infographic.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          title: "Share failed",
          description: "Could not share the infographic. Try downloading instead.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support sharing. Try downloading instead.",
        variant: "destructive",
      });
    }
  };

  const handleStartNew = () => {
    navigate('/');
  };

  if (!imageUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">Your Infographic is Ready!</span>
          </div>
          <h1 className="text-4xl font-heading font-bold text-gradient">
            {topic}
          </h1>
        </div>

        {/* Infographic Display */}
        <div className="glass-card p-4 hover-lift">
          <img
            src={imageUrl}
            alt={`Infographic about ${topic}`}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 shadow-medium hover:shadow-strong transition-all"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>

          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="gap-2 px-8 border-2 hover:border-accent hover:text-accent transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share
          </Button>

          <Button
            onClick={handleStartNew}
            size="lg"
            variant="outline"
            className="gap-2 px-8 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Start New
          </Button>
        </div>

        {/* Tips */}
        <div className="glass-card p-6 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-accent mb-2 text-center">PRO TIP</p>
          <p className="text-sm text-center text-muted-foreground">
            Download your infographic to use in presentations, study notes, or share with classmates. 
            Each infographic is uniquely generated just for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
