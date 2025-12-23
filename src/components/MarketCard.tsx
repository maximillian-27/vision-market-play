import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  logo?: string;
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
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const isBinary = displayOutcomes.length === 2 && !outcomes;

  const handleRepost = () => {
    if (repostThoughts.trim()) {
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
        className="overflow-hidden transition-all hover:bg-accent/30 cursor-pointer border-border/40"
        onClick={() => navigate(`/market/${id}`)}
      >
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover"
            />
            {/* Creator badge on image */}
            <button 
              className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5"
              onClick={(e) => {
                e.stopPropagation();
                const profilePath = creator.isCreator !== false 
                  ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                  : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                navigate(profilePath);
              }}
            >
              <Avatar className="h-3.5 w-3.5">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-[6px]">{creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-white text-[9px] font-medium max-w-[50px] truncate">{creator.name.split(' ')[0]}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-2.5 w-2.5 text-white fill-white/30" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title & Stats */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  {volume}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  {endsIn}
                </span>
              </div>
            </div>

            {/* Outcomes */}
            <div className="mt-2">
              {isBinary ? (
                <div className="flex gap-1.5">
                  {displayOutcomes.map((outcome, index) => (
                    <button 
                      key={index}
                      className={`flex-1 rounded-md py-1.5 text-center transition-all active:scale-95 ${
                        outcome.color === 'success'
                          ? 'bg-success/10 hover:bg-success/20 text-success border border-success/20'
                          : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border/40'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="text-base font-bold leading-none">{outcome.price}¢</div>
                      <div className="text-[9px] font-medium mt-0.5">{outcome.label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-1 flex-wrap">
                  {displayOutcomes.slice(0, 3).map((outcome, index) => (
                    <button 
                      key={index}
                      className="flex items-center gap-1 rounded-md px-2 py-1 bg-secondary/50 hover:bg-secondary transition-colors text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="text-[10px] font-medium">{outcome.label}</span>
                      <span className="text-[11px] font-bold ml-0.5">{outcome.price}%</span>
                    </button>
                  ))}
                  {displayOutcomes.length > 3 && (
                    <span className="text-[9px] text-muted-foreground self-center ml-1">+{displayOutcomes.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            {/* Engagement */}
            {!hideEngagement && (
              <div className="flex items-center gap-0.5 mt-2 -ml-1">
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-[10px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-3 w-3" />
                  {likes > 0 && <span>{likes}</span>}
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-[10px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="h-3 w-3" />
                  {comments > 0 && <span>{comments}</span>}
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRepostDialog(true);
                  }}
                >
                  <Repeat2 className="h-3 w-3" />
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
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
              className="min-h-[100px]"
              maxLength={500}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {repostThoughts.length}/500
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowRepostDialog(false);
                    setRepostThoughts("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
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
