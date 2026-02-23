import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { QuoteRepostDialog } from "@/components/QuoteRepostDialog";
import {
  BadgeCheck,
  Share2,
  Repeat2,
  ChevronDown,
  ChevronUp,
  Scale,
  Send,
  Heart,
  MessageCircle,
  Clock,
  Wallet,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface Comment {
  id: string;
  author: { name: string; avatar: string; username: string };
  text: string;
  timestamp: string;
  likes: number;
}

interface MarketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: {
    id: string;
    title: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
      id?: string;
      isCreator?: boolean;
    };
    outcomes: Outcome[];
    volume: string;
    pot?: number;
    players?: number;
    endsIn: string;
    traders?: number;
    description?: string;
    resolutionCriteria?: string;
    priceHistory?: { date: string; price: number }[];
    comments?: Comment[];
    status?: string;
    resolutionDate?: string;
  };
}

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

const getMockMarketDetails = (marketId: string) => ({
  description: "This market tracks the prediction outcome based on official announcements and verified data sources. The resolution will be determined by the primary outcome at the specified end date.",
  resolutionCriteria: "This market resolves to YES if the specified outcome occurs before the end date. Resolution is based on official announcements from primary sources.",
  comments: [
    {
      id: "1",
      author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" },
      text: "Looking bullish on this one. The fundamentals are strong.",
      timestamp: "2h",
      likes: 24,
    },
    {
      id: "2",
      author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" },
      text: "I'm taking the other side here. Too much uncertainty.",
      timestamp: "4h",
      likes: 12,
    },
  ],
});

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum entry is $1" })
    .max(10000, { message: "Maximum entry is $10,000" })
});

const POT_SPLIT = [
  { label: "Winners", pct: 90, color: "bg-primary" },
  { label: "Draw", pct: 2, color: "bg-[hsl(var(--pollgy-blue))]" },
  { label: "Comp", pct: 5, color: "bg-accent-foreground" },
  { label: "Platform", pct: 3, color: "bg-muted-foreground" },
];

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showRepost, setShowRepost] = useState(false);

  const mockDetails = getMockMarketDetails(market.id);
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const comments = market.comments || mockDetails.comments;

  const isBinary = market.outcomes.length === 2 &&
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");

  const isAwaitingResolution = market.status === "awaiting_resolution";

  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const ticketPrice = selectedPrice / 100;
  const payout = selectedPrice > 0 ? amountNum / ticketPrice : 0;
  const winnings = payout - amountNum;
  const potDisplay = market.pot ? formatPot(market.pot) : market.volume;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Select an outcome",
        description: "Please select an outcome before placing an entry",
        variant: "destructive"
      });
      return;
    }

    try {
      buySchema.parse({ amount: amountNum });

      setIsSubmitting(true);

      setTimeout(() => {
        toast({
          title: "Entry placed!",
          description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"`,
        });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid amount",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
    toast({ title: "Link copied!" });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    toast({ title: "Comment posted" });
    setCommentText("");
  };

  const quickAmounts = [5, 10, 25, 50];

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setAmount("10");
      setShowComments(false);
      setShowResolution(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[820px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header: Creator + Share/Repost */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback className="text-[10px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{market.creator.name}</span>
              {market.creator.isCreator !== false && (
                <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowRepost(true)}>
                <Repeat2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
            {/* LEFT COLUMN: Market Info */}
            <ScrollArea className="flex-1 sm:border-r border-border/40">
              <div className="p-5 space-y-4">
                {/* Title */}
                <h2 className="text-lg font-bold leading-snug">{market.title}</h2>

                {/* Pot Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-extrabold">
                    <Zap className="h-3.5 w-3.5" />
                    {potDisplay} Pot
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>

                <Separator className="!my-1" />

                {/* Resolution Criteria (collapsible) */}
                <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Scale className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Resolution Criteria</span>
                    </div>
                    {showResolution ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2 px-1">
                      {resolutionCriteria}
                    </p>
                  </CollapsibleContent>
                </Collapsible>

                {/* Comments (collapsible) */}
                <Collapsible open={showComments} onOpenChange={setShowComments}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{comments.length} Comments</span>
                    </div>
                    {showComments ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 space-y-3">
                      {comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2">
                          <Avatar className="h-6 w-6 flex-shrink-0">
                            <AvatarImage src={comment.author.avatar} />
                            <AvatarFallback className="text-[8px]">{comment.author.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs">
                              <span className="font-semibold">{comment.author.username} </span>
                              <span className="text-foreground/80">{comment.text}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                              <span>{comment.timestamp}</span>
                              <span>{comment.likes} likes</span>
                            </div>
                          </div>
                          <Heart className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                        </div>
                      ))}

                      <div className="flex items-center gap-2 pt-2">
                        <Input
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                          className="h-8 text-xs"
                        />
                        {commentText.trim() && (
                          <Button size="icon" className="h-8 w-8" onClick={handleComment}>
                            <Send className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Full page link - subtle footer */}
                <button
                  onClick={() => { onOpenChange(false); navigate(`/market/${market.id}`); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  View full market page
                </button>
              </div>
            </ScrollArea>

            {/* RIGHT COLUMN: Entry Panel */}
            <div className="w-full sm:w-[280px] flex-shrink-0 bg-muted/20 flex flex-col">
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {/* Awaiting Resolution */}
                {isAwaitingResolution ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-[hsl(var(--pollgy-blue))]/10 border border-[hsl(var(--pollgy-blue))]/20 text-center">
                      <Clock className="h-5 w-5 text-[hsl(var(--pollgy-blue))] mx-auto mb-1.5" />
                      <p className="text-sm font-semibold text-[hsl(var(--pollgy-blue))]">Entries Closed</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Awaiting resolution</p>
                      {market.resolutionDate && (
                        <p className="text-xs text-[hsl(var(--pollgy-blue))] mt-1">{market.resolutionDate}</p>
                      )}
                    </div>

                    {isBinary && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground text-center">Final Probability</p>
                        <div className="grid grid-cols-2 gap-2 opacity-75">
                          {market.outcomes.map((outcome, index) => {
                            const isYes = outcome.label.toLowerCase() === "yes";
                            return (
                              <div
                                key={index}
                                className={`rounded-lg py-2.5 text-center border ${
                                  isYes
                                    ? 'border-success/30 bg-success/10 text-success'
                                    : 'border-destructive/30 bg-destructive/10 text-destructive'
                                }`}
                              >
                                <span className="text-sm font-bold uppercase">{outcome.label}</span>
                                <p className="text-xs opacity-75">{outcome.price}%</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Outcomes */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Outcomes</span>

                      {isBinary ? (
                        <>
                          {/* Probability bar */}
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-success w-10">{market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price || 50}%</span>
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-success to-success/80"
                                style={{ width: `${market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price || 50}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground w-10 text-right">{market.outcomes.find(o => o.label.toLowerCase() === "no")?.price || 50}%</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {market.outcomes.map((outcome, index) => {
                              const isYes = outcome.label.toLowerCase() === "yes";
                              const isSelected = selectedOutcome?.label === outcome.label;

                              return (
                                <button
                                  key={index}
                                  onClick={() => setSelectedOutcome(outcome)}
                                  className={`rounded-lg py-2.5 text-center transition-all active:scale-[0.98] border ${
                                    isSelected
                                      ? isYes
                                        ? 'border-success bg-success/20 text-success ring-1 ring-success/40'
                                        : 'border-destructive bg-destructive/20 text-destructive ring-1 ring-destructive/40'
                                      : isYes
                                        ? 'border-success/30 bg-success/10 text-success hover:bg-success/15'
                                        : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15'
                                  }`}
                                >
                                  <span className="text-sm font-bold uppercase">{outcome.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                          {market.outcomes.map((outcome, index) => {
                            const isSelected = selectedOutcome?.label === outcome.label;

                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedOutcome(outcome)}
                                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all active:scale-[0.98] border text-left ${
                                  isSelected
                                    ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                                    : 'border-border/40 bg-secondary/60 hover:bg-secondary hover:border-border/60'
                                }`}
                              >
                                {outcome.logo ? (
                                  <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain rounded-sm" />
                                ) : (
                                  <div className="h-5 w-5 rounded-sm bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                    {outcome.label.charAt(0)}
                                  </div>
                                )}
                                <span className="flex-1 text-sm font-medium truncate">{outcome.label}</span>
                                <span className="text-sm font-bold text-primary">{outcome.price}%</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Ticket price */}
                      {selectedOutcome && (
                        <p className="text-xs text-muted-foreground text-center">
                          Ticket price: <span className="font-semibold text-foreground">${(selectedOutcome.price / 100).toFixed(2)}</span>
                        </p>
                      )}
                    </div>

                    {/* Entry Amount */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">Entry Amount</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Wallet className="h-3 w-3" />
                          <span>$5,230</span>
                        </div>
                      </div>

                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-6 h-10 text-base font-semibold bg-background"
                          min="1"
                          max="10000"
                          step="1"
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        {quickAmounts.map((qa) => (
                          <Button
                            key={qa}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(qa.toString())}
                            className={`h-7 text-xs px-0 ${amount === qa.toString() ? 'border-primary bg-primary/5 text-primary' : 'bg-background'}`}
                          >
                            ${qa}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* If You Win */}
                    <div className="p-3 rounded-xl bg-background border border-border/50 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">If you win</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Entry</span>
                        <span className="font-semibold">${amountNum.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Payout</span>
                        <span className="font-bold">{selectedOutcome ? `$${payout.toFixed(2)}` : "—"}</span>
                      </div>
                      <Separator className="!my-1" />
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Winnings</span>
                        <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
                          {selectedOutcome ? `+$${winnings.toFixed(2)}` : "—"}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug">
                        ⚡ Winners split the pot — potential winnings may fluctuate.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Buy Button + Pot Split */}
              {!isAwaitingResolution && (
                <div className="p-4 pt-0 space-y-3">
                  <Button
                    className="w-full h-11 font-semibold text-sm"
                    onClick={handleBuy}
                    disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}
                  >
                    {isSubmitting
                      ? "Placing entry..."
                      : selectedOutcome
                        ? `Enter ${selectedOutcome.label} • $${amountNum.toFixed(2)}`
                        : "Select outcome to enter"
                    }
                  </Button>

                  {/* Pot Revenue Split */}
                  <div className="space-y-1.5">
                    <div className="flex h-1.5 rounded-full overflow-hidden">
                      {POT_SPLIT.map((s) => (
                        <div key={s.label} className={`${s.color}`} style={{ width: `${s.pct}%` }} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                      {POT_SPLIT.map((s) => (
                        <span key={s.label} className="flex items-center gap-0.5">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.color}`} />
                          {s.pct}% {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QuoteRepostDialog
        open={showRepost}
        onOpenChange={setShowRepost}
        marketTitle={market.title}
        marketImage={market.image}
      />
    </>
  );
}
