import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
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
      <DialogContent hideClose onClick={(e) => e.stopPropagation()} className="sm:max-w-md p-0 gap-0">
        <div className="flex items-center gap-3 p-4 border-b border-border/40">
          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-base font-semibold">Repost to Community Feed</h2>
            <p className="text-xs text-muted-foreground">Share your thoughts on this market with the community</p>
          </div>
        </div>
        <div className="p-5">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
