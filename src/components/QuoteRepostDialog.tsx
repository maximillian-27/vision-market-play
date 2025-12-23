import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface QuoteRepostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marketTitle: string;
  marketImage?: string;
}

export function QuoteRepostDialog({ 
  open, 
  onOpenChange, 
  marketTitle,
  marketImage 
}: QuoteRepostDialogProps) {
  const { toast } = useToast();
  const [thoughts, setThoughts] = useState("");

  const handleRepost = () => {
    toast({
      title: "Market reposted!",
      description: thoughts.trim() 
        ? "Your thoughts have been shared to the Community Feed."
        : "Shared to your feed.",
    });
    setThoughts("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setThoughts("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClick={(e) => e.stopPropagation()} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Repost to Community Feed</DialogTitle>
          <DialogDescription>
            Share your thoughts on this market with the community
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <Textarea
            placeholder="What do you think about this market? (optional)"
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
          
          {/* Market preview */}
          <Card className="p-3 bg-muted/30 border-border/40">
            <div className="flex gap-3">
              {marketImage && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img 
                    src={marketImage} 
                    alt={marketTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm font-medium line-clamp-2 flex-1">{marketTitle}</p>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {thoughts.length}/500
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleRepost}
              >
                Repost
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
