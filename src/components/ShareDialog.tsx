import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  topic: string;
}

const ShareDialog = ({ open, onOpenChange, imageUrl, topic }: ShareDialogProps) => {
  const shareText = `Check out this infographic about ${topic}!`;
  const shareUrl = window.location.href;

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct web sharing, so we'll copy the link
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied! You can now paste it in your Instagram post or story.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Share Infographic</DialogTitle>
          <DialogDescription>
            Share this infographic on your favorite social media platform
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            onClick={handleFacebookShare}
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 border-2 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Facebook className="w-8 h-8 text-[#1877F2]" />
            <span className="text-sm font-semibold">Facebook</span>
          </Button>

          <Button
            onClick={handleTwitterShare}
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 border-2 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-semibold">X (Twitter)</span>
          </Button>

          <Button
            onClick={handleLinkedInShare}
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 border-2 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Linkedin className="w-8 h-8 text-[#0A66C2]" />
            <span className="text-sm font-semibold">LinkedIn</span>
          </Button>

          <Button
            onClick={handleInstagramShare}
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 border-2 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Instagram className="w-8 h-8 text-[#E4405F]" />
            <span className="text-sm font-semibold">Instagram</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
