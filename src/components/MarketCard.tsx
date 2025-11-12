import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Heart, MessageCircle, Share2, Repeat2, BadgeCheck, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Outcome {
  label: string;
  price: number;
  color?: string;
}

interface MarketCardProps {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id?: string;
    isCreator?: boolean;
  };
  title: string;
  subtitle?: string;
  image: string;
  outcomes?: Outcome[];
  yesPrice?: number;
  noPrice?: number;
  volume: string;
  endsIn: string;
  likes?: number;
  comments?: number;
  hideEngagement?: boolean;
}

export function MarketCard({ id, creator, title, subtitle, image, outcomes, yesPrice, noPrice, volume, endsIn, likes = 0, comments = 0, hideEngagement = false }: MarketCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [repostThoughts, setRepostThoughts] = useState("");
  
  // Use outcomes if provided, otherwise fallback to binary yes/no
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const getOutcomeColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-success/10 border-success/20 hover:bg-success/15";
      case "destructive": return "bg-muted/30 border-border/30 hover:bg-muted/40";
      default: return "bg-primary/10 border-primary/20 hover:bg-primary/15";
    }
  };

  const getOutcomeIcon = (color?: string) => {
    switch (color) {
      case "success": return <Check className="h-4 w-4" />;
      case "destructive": return <X className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  const getIconBgColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const hasMultipleOutcomes = displayOutcomes.length > 2;

  const handleRepost = () => {
    if (repostThoughts.trim()) {
      // In a real app, this would save to the backend
      toast({
        title: "Market reposted!",
        description: "Your thoughts have been shared to the Community Feed.",
      });
      setRepostThoughts("");
      setShowRepostDialog(false);
    }
  };

  return (
    <>
      <Card 
        className="overflow-hidden transition-all hover:bg-accent/30 md:rounded-xl rounded-none border-x-0 md:border-x border-t-0 md:border-t first:border-t cursor-pointer border-border/40"
        onClick={() => navigate(`/market/${id}`)}
      >
      <CardContent className="p-0">
        {/* Creator Info */}
        <div 
          className="flex items-center gap-3 p-4 md:p-5 pb-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            const profilePath = creator.isCreator !== false 
              ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
              : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
            navigate(profilePath);
          }}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-sm">{creator.name}</p>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-4 md:px-5 pb-3">
          <h3 className="text-base md:text-lg font-semibold leading-snug">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Market Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Market Stats */}
        <div className="p-4 md:p-5 space-y-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{volume}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Clock className="h-3.5 w-3.5" />
              <span>{endsIn}</span>
            </div>
          </div>

          {/* Outcome Buttons */}
          <div className={`space-y-2 ${hasMultipleOutcomes ? 'max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border/60 pr-1' : ''}`}>
            {displayOutcomes.map((outcome, index) => {
              const payout = outcome.price > 0 ? (10000 / outcome.price).toFixed(0) : 0;
              return (
                <button 
                  key={index}
                  className={`w-full text-left rounded-lg px-3 py-2.5 border transition-all ${getOutcomeColor(outcome.color)} flex items-center gap-2.5`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle bet action
                  }}
                >
                  <div className={`rounded-full p-1.5 flex-shrink-0 ${getIconBgColor(outcome.color)}`}>
                    {getOutcomeIcon(outcome.color)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground">{outcome.label}</div>
                    <div className="text-xs text-muted-foreground font-medium">
                      $100 → ${payout}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-foreground ml-auto">{outcome.price}¢</span>
                </button>
              );
            })}
          </div>

          {/* Engagement Indicators */}
          {!hideEngagement && (
            <div className="flex items-center gap-1 pt-1">
              <button 
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="h-3.5 w-3.5" />
                {likes > 0 && <span>{likes}</span>}
              </button>
              <button 
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {comments > 0 && <span>{comments}</span>}
              </button>
              <button 
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRepostDialog(true);
                }}
              >
                <Repeat2 className="h-3.5 w-3.5" />
              </button>
              <button 
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all ml-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Repost Dialog */}
    <Dialog open={showRepostDialog} onOpenChange={setShowRepostDialog}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Repost to Community Feed</DialogTitle>
          <DialogDescription>
            Share your thoughts on this market with the community
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Textarea
            placeholder="What do you think about this market?"
            value={repostThoughts}
            onChange={(e) => setRepostThoughts(e.target.value)}
            className="min-h-[120px]"
            maxLength={500}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {repostThoughts.length}/500
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRepostDialog(false);
                  setRepostThoughts("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRepost}
                disabled={!repostThoughts.trim()}
              >
                Repost
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
}
