import { useState, useEffect } from "react";
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
import { ResponsiveContainer, AreaChart, Area, Tooltip, Legend } from "recharts";
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
  TrendingUp,
  Users,
  Timer,
  Ticket,
  Minus,
  Plus,
  Trophy,
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
    ticketPrice?: number;
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
  priceHistory: [] as { date: string; [key: string]: number | string }[],
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

const ticketSchema = z.object({
  tickets: z.number()
    .min(1, { message: "Buy at least 1 ticket" })
    .max(1000, { message: "Maximum 1,000 tickets" })
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
  const [ticketCount, setTicketCount] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showRepost, setShowRepost] = useState(false);

  const mockDetails = getMockMarketDetails(market.id);
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const comments = market.comments || mockDetails.comments;

  // Generate probability history for each outcome
  const generateProbabilityHistory = () => {
    const points = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Now"];
    const outcomes = market.outcomes;
    return points.map((date, i) => {
      const row: Record<string, number | string> = { date };
      outcomes.forEach((o, oi) => {
        // Create a smooth random walk toward the current price
        const target = o.price;
        const start = 100 / outcomes.length; // equal start
        const progress = i / (points.length - 1);
        const noise = (Math.sin((i + 1) * (oi + 2) * 1.7) * 8);
        row[o.label] = Math.max(1, Math.min(99, Math.round(start + (target - start) * progress + noise * (1 - progress))));
      });
      return row;
    });
  };

  const probabilityHistory = market.priceHistory?.length ? market.priceHistory : generateProbabilityHistory();

  const isBinary = market.outcomes.length === 2 &&
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");

  const isAwaitingResolution = market.status === "awaiting_resolution";

  // Auto-select first outcome
  useEffect(() => {
    if (open && !selectedOutcome && market.outcomes.length > 0) {
      setSelectedOutcome(market.outcomes[0]);
    }
  }, [open, market.outcomes]);

  // Ticket price is uniform for all outcomes (pari-mutuel). Mock: based on time progression
  const currentTicketPrice = market.ticketPrice || 0.50;
  const totalCost = ticketCount * currentTicketPrice;
  
  // Approximate profit: based on pot size and number of winners
  // In pari-mutuel, winnings = (your tickets / total winning tickets) * 90% of pot
  const potValue = market.pot || 240000;
  const estimatedWinningPool = potValue * 0.9;
  // Rough estimate: assume ~60% of tickets are on winning side
  const estimatedWinningTickets = Math.round(potValue / currentTicketPrice * 0.6);
  const estimatedPayout = estimatedWinningTickets > 0 
    ? (ticketCount / estimatedWinningTickets) * estimatedWinningPool 
    : 0;
  const estimatedProfit = estimatedPayout - totalCost;
  
  const potDisplay = formatPot(potValue);
  const playerCount = market.players || market.traders || 1247;
  

  // Community sentiment from outcome prices
  const yesOutcome = market.outcomes.find(o => o.label.toLowerCase() === "yes");
  const noOutcome = market.outcomes.find(o => o.label.toLowerCase() === "no");
  const yesPct = yesOutcome?.price || 50;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Pick your side",
        description: "Select an outcome before buying tickets",
        variant: "destructive"
      });
      return;
    }

    try {
      ticketSchema.parse({ tickets: ticketCount });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({
          title: "🎟️ Tickets purchased!",
          description: `${ticketCount} ticket${ticketCount > 1 ? 's' : ''} on "${selectedOutcome.label}" for $${totalCost.toFixed(2)}`,
        });
        onOpenChange(false);
        setIsSubmitting(false);
        setTicketCount(5);
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

  const quickTickets = [1, 5, 10, 25];

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setTicketCount(5);
      setShowResolution(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[820px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/30 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback className="text-[9px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{market.creator.name}</span>
              {market.creator.isCreator !== false && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleShare}>
                <Share2 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowRepost(true)}>
                <Repeat2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
            {/* LEFT COLUMN */}
            <ScrollArea className="flex-1 sm:border-r border-border/30">
              <div className="p-5 space-y-4">
                {/* Title + Pot + Meta */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={market.image}
                      alt=""
                      className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mt-0.5"
                    />
                    <h2 className="text-lg font-bold leading-snug">{market.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                      <Zap className="h-3 w-3" />
                      {potDisplay} Pot
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {playerCount.toLocaleString()} players
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Timer className="h-3 w-3" />
                      {market.endsIn}
                    </span>
                  </div>
                </div>

                {/* Community Sentiment - inline under metadata */}
                {isBinary && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-success">{yesPct}%</span>
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-success/60" style={{ width: `${yesPct}%` }} />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{100 - yesPct}%</span>
                  </div>
                )}

                {/* Probability Chart - all outcomes */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>Probability</span>
                  </div>
                  <div className="h-28 rounded-lg overflow-hidden bg-muted/20 p-1.5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={probabilityHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                        <defs>
                          {market.outcomes.map((o, i) => {
                            const colors = [
                              "hsl(var(--success))",
                              "hsl(var(--destructive))",
                              "hsl(var(--primary))",
                              "hsl(var(--accent-foreground))",
                              "hsl(var(--pollgy-blue))",
                            ];
                            const color = isBinary
                              ? (o.label.toLowerCase() === "yes" ? "hsl(var(--success))" : "hsl(var(--destructive))")
                              : colors[i % colors.length];
                            return (
                              <linearGradient key={o.label} id={`probGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                              </linearGradient>
                            );
                          })}
                        </defs>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            fontSize: "11px",
                            padding: "4px 8px"
                          }}
                          formatter={(value: any, name: string) => [`${value}%`, name]}
                        />
                        {market.outcomes.map((o, i) => {
                          const colors = [
                            "hsl(var(--success))",
                            "hsl(var(--destructive))",
                            "hsl(var(--primary))",
                            "hsl(var(--accent-foreground))",
                            "hsl(var(--pollgy-blue))",
                          ];
                          const color = isBinary
                            ? (o.label.toLowerCase() === "yes" ? "hsl(var(--success))" : "hsl(var(--destructive))")
                            : colors[i % colors.length];
                          return (
                            <Area
                              key={o.label}
                              type="monotone"
                              dataKey={o.label}
                              stroke={color}
                              fill={`url(#probGrad-${i})`}
                              strokeWidth={1.5}
                            />
                          );
                        })}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {market.outcomes.map((o, i) => {
                      const colors = [
                        "bg-success",
                        "bg-destructive",
                        "bg-primary",
                        "bg-accent-foreground",
                        "bg-[hsl(var(--pollgy-blue))]",
                      ];
                      const colorClass = isBinary
                        ? (o.label.toLowerCase() === "yes" ? "bg-success" : "bg-destructive")
                        : colors[i % colors.length];
                      return (
                        <span key={o.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${colorClass}`} />
                          {o.label} {o.price}%
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

                {/* Resolution Criteria (collapsible) */}
                <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 px-2.5 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Scale className="h-3 w-3" />
                      <span>Resolution Criteria</span>
                    </div>
                    {showResolution ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 px-1">{resolutionCriteria}</p>
                  </CollapsibleContent>
                </Collapsible>

                <Separator />

                {/* Comments */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{comments.length} Comments</span>
                  </div>

                  {comments.slice(0, 4).map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2">
                      <Avatar className="h-5 w-5 flex-shrink-0 mt-0.5">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback className="text-[7px]">{comment.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug">
                          <span className="font-semibold">{comment.author.username} </span>
                          <span className="text-foreground/80">{comment.text}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                          <span>{comment.timestamp}</span>
                          <span>{comment.likes} likes</span>
                        </div>
                      </div>
                      <Heart className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-1 cursor-pointer hover:text-destructive transition-colors" />
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                      className="h-7 text-xs"
                    />
                    {commentText.trim() && (
                      <Button size="icon" className="h-7 w-7" onClick={handleComment}>
                        <Send className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => { onOpenChange(false); navigate(`/market/${market.id}`); }}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  View full market page
                </button>
              </div>
            </ScrollArea>

            {/* RIGHT COLUMN - Ticket Purchase */}
            <div className="w-full sm:w-[290px] flex-shrink-0 flex flex-col">
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {isAwaitingResolution ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[hsl(var(--pollgy-blue))]/10 border border-[hsl(var(--pollgy-blue))]/20 text-center">
                      <Clock className="h-5 w-5 text-[hsl(var(--pollgy-blue))] mx-auto mb-1.5" />
                      <p className="text-sm font-semibold text-[hsl(var(--pollgy-blue))]">Entries Closed</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Awaiting resolution</p>
                      {market.resolutionDate && (
                        <p className="text-xs text-[hsl(var(--pollgy-blue))] mt-1">{market.resolutionDate}</p>
                      )}
                    </div>
                    {isBinary && (
                      <div className="grid grid-cols-2 gap-2 opacity-75">
                        {market.outcomes.map((outcome, index) => {
                          const isYes = outcome.label.toLowerCase() === "yes";
                          return (
                            <div key={index} className={`rounded-xl py-3 text-center border ${isYes ? 'border-success/30 bg-success/10 text-success' : 'border-destructive/30 bg-destructive/10 text-destructive'}`}>
                              <span className="text-sm font-bold uppercase">{outcome.label}</span>
                              <p className="text-xs opacity-75 mt-0.5">{outcome.price}%</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Pick your side */}
                    <div className="space-y-2">

                      {isBinary ? (
                        <div className="grid grid-cols-2 gap-2">
                          {market.outcomes.map((outcome, index) => {
                            const isYes = outcome.label.toLowerCase() === "yes";
                            const isSelected = selectedOutcome?.label === outcome.label;
                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedOutcome(outcome)}
                                className={`rounded-xl py-5 text-center transition-all active:scale-[0.97] border-2 ${
                                  isSelected
                                    ? isYes
                                      ? 'border-success bg-success/15 text-success shadow-[0_0_12px_hsl(var(--success)/0.15)]'
                                      : 'border-destructive bg-destructive/15 text-destructive shadow-[0_0_12px_hsl(var(--destructive)/0.15)]'
                                    : isYes
                                      ? 'border-success/20 bg-success/5 text-success hover:bg-success/10 hover:border-success/40'
                                      : 'border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:border-destructive/40'
                                }`}
                              >
                                <span className="text-lg font-bold uppercase">{isYes ? '👍' : '👎'} {outcome.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                          {market.outcomes.map((outcome, index) => {
                            const isSelected = selectedOutcome?.label === outcome.label;
                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedOutcome(outcome)}
                                className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all active:scale-[0.98] border-2 text-left ${
                                  isSelected ? 'border-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.1)]' : 'border-border/30 hover:border-border/60 hover:bg-muted/30'
                                }`}
                              >
                                {outcome.logo ? (
                                  <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain rounded-sm" />
                                ) : (
                                  <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{outcome.label.charAt(0)}</div>
                                )}
                                <span className="flex-1 text-sm font-medium truncate">{outcome.label}</span>
                                {isSelected && (
                                  <span className="text-[10px] font-semibold text-primary">Selected</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Tickets */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">${currentTicketPrice.toFixed(2)}/ticket <span className="opacity-60">(price increases over time)</span></span>
                      </div>

                      {/* Ticket counter */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                          className="h-9 w-9 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/60 flex items-center justify-center transition-colors active:scale-95"
                        >
                          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <Input
                          type="number"
                          value={ticketCount}
                          onChange={(e) => {
                            const v = parseInt(e.target.value);
                            if (!isNaN(v) && v >= 0) setTicketCount(Math.min(1000, v));
                          }}
                          className="h-9 text-center text-lg font-bold bg-background flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="1"
                          max="1000"
                        />
                        <button
                          onClick={() => setTicketCount(Math.min(1000, ticketCount + 1))}
                          className="h-9 w-9 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/60 flex items-center justify-center transition-colors active:scale-95"
                        >
                          <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Quick select */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {quickTickets.map((qt) => (
                          <button
                            key={qt}
                            onClick={() => setTicketCount(qt)}
                            className={`h-7 rounded-lg text-[11px] font-semibold transition-all active:scale-95 ${
                              ticketCount === qt
                                ? 'bg-primary/10 text-primary border border-primary/30'
                                : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent'
                            }`}
                          >
                            {qt} {qt === 1 ? 'ticket' : 'tickets'}
                          </button>
                        ))}
                      </div>

                    </div>

                    {/* Summary breakdown */}
                    <div className="rounded-xl border border-border/40 divide-y divide-border/30">
                      <div className="flex justify-between items-center px-3 py-2">
                        <span className="text-xs text-muted-foreground">Cost</span>
                        <span className="text-sm font-semibold">${totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center px-3 py-2">
                        <span className="text-xs text-muted-foreground">Potential winning</span>
                        <span className="text-sm font-semibold">${estimatedPayout > 0 ? estimatedPayout.toFixed(2) : '0.00'}</span>
                      </div>
                      <div className="flex justify-between items-center px-3 py-2 bg-success/5">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="h-3.5 w-3.5 text-success" />
                          <span className="text-xs font-medium text-success">Potential profit</span>
                        </div>
                        <span className={`text-lg font-bold ${estimatedProfit > 0 ? 'text-success' : 'text-foreground'}`}>
                          +${estimatedProfit > 0 ? estimatedProfit.toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground text-center">
                      Winners split 90% of the pot · final payout depends on total entries
                    </p>
                  </>
                )}
              </div>

              {/* Buy Button + Pot Split */}
              {!isAwaitingResolution && (
                <div className="p-4 pt-0 space-y-2.5">
                  <Button
                    className="w-full h-11 font-bold text-sm rounded-xl [background:var(--gradient-primary)] hover:opacity-90 transition-all active:scale-[0.98] shadow-md"
                    onClick={handleBuy}
                    disabled={!selectedOutcome || isSubmitting || ticketCount < 1}
                  >
                    {isSubmitting
                      ? "Buying tickets..."
                      : selectedOutcome
                        ? `🎟️ Buy ${ticketCount} ticket${ticketCount !== 1 ? 's' : ''} · $${totalCost.toFixed(2)}`
                        : "Pick your side first"
                    }
                  </Button>

                  <div className="space-y-1">
                    <div className="flex h-1.5 rounded-full overflow-hidden">
                      {POT_SPLIT.map((s) => (
                        <div key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[8px] text-muted-foreground">
                      {POT_SPLIT.map((s) => (
                        <span key={s.label} className="flex items-center gap-0.5">
                          <span className={`inline-block h-1 w-1 rounded-full ${s.color}`} />
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
