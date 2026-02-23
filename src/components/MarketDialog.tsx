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
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, ReferenceDot } from "recharts";
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
  priceHistory: [
    { date: "Jan", price: 42 },
    { date: "Feb", price: 52 },
    { date: "Mar", price: 55 },
    { date: "Apr", price: 62 },
    { date: "May", price: 68 },
    { date: "Jun", price: 70 },
    { date: "Now", price: 68 },
  ],
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
  const [commentText, setCommentText] = useState("");
  const [showRepost, setShowRepost] = useState(false);

  const mockDetails = getMockMarketDetails(market.id);
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const priceHistory = market.priceHistory || mockDetails.priceHistory;
  const comments = market.comments || mockDetails.comments;

  const isBinary = market.outcomes.length === 2 &&
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");

  const isAwaitingResolution = market.status === "awaiting_resolution";

  // Auto-select first outcome so payout is never empty
  useEffect(() => {
    if (open && !selectedOutcome && market.outcomes.length > 0) {
      setSelectedOutcome(market.outcomes[0]);
    }
  }, [open, market.outcomes]);

  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || market.outcomes[0]?.price || 50;
  const ticketPrice = selectedPrice / 100;
  const payout = ticketPrice > 0 ? amountNum / ticketPrice : 0;
  const winnings = payout - amountNum;
  const potDisplay = market.pot ? formatPot(market.pot) : market.volume;
  const playerCount = market.players || market.traders || 1247;
  const lastPrice = priceHistory[priceHistory.length - 1];

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
      setShowResolution(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[840px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
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
                {/* Title with thumbnail + Pot */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={market.image}
                      alt=""
                      className="h-7 w-7 rounded-md object-cover flex-shrink-0 mt-0.5"
                    />
                    <h2 className="text-lg font-bold leading-snug">{market.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
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

                {/* Mini Price Chart - taller with current price dot */}
                <div className="h-28 rounded-lg overflow-hidden bg-muted/20 p-1.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dialogChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                        interval="preserveStartEnd"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                          fontSize: "11px",
                          padding: "4px 8px"
                        }}
                        formatter={(value: any) => [`${value}%`, "Probability"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        fill="url(#dialogChartGrad)"
                        strokeWidth={1.5}
                      />
                      {/* Current price dot */}
                      {lastPrice && (
                        <ReferenceDot
                          x={lastPrice.date}
                          y={lastPrice.price}
                          r={4}
                          fill="hsl(var(--primary))"
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
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

                {/* Comments - always visible */}
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

                {/* Full page link */}
                <button
                  onClick={() => { onOpenChange(false); navigate(`/market/${market.id}`); }}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  View full market page
                </button>
              </div>
            </ScrollArea>

            {/* RIGHT COLUMN */}
            <div className="w-full sm:w-[280px] flex-shrink-0 flex flex-col">
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
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
                              <div key={index} className={`rounded-lg py-2.5 text-center border ${isYes ? 'border-success/30 bg-success/10 text-success' : 'border-destructive/30 bg-destructive/10 text-destructive'}`}>
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
                    {/* Ends in badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Outcomes</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        <Timer className="h-2.5 w-2.5" />
                        {market.endsIn}
                      </span>
                    </div>

                    {/* Outcomes with ticket price */}
                    <div className="space-y-2">
                      {isBinary ? (
                        <>
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-success w-8">{market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price || 50}%</span>
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-success" style={{ width: `${market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price || 50}%` }} />
                            </div>
                            <span className="text-muted-foreground w-8 text-right">{market.outcomes.find(o => o.label.toLowerCase() === "no")?.price || 50}%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {market.outcomes.map((outcome, index) => {
                              const isYes = outcome.label.toLowerCase() === "yes";
                              const isSelected = selectedOutcome?.label === outcome.label;
                              const ticketCost = (outcome.price / 100).toFixed(2);
                              return (
                                <button
                                  key={index}
                                  onClick={() => setSelectedOutcome(outcome)}
                                  className={`rounded-lg py-2.5 text-center transition-all active:scale-[0.98] border ${
                                    isSelected
                                      ? isYes ? 'border-success bg-success/20 text-success ring-1 ring-success/30' : 'border-destructive bg-destructive/20 text-destructive ring-1 ring-destructive/30'
                                      : isYes ? 'border-success/20 bg-success/5 text-success hover:bg-success/10' : 'border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10'
                                  }`}
                                >
                                  <span className="text-xs font-bold uppercase">{outcome.label} {outcome.price}%</span>
                                  <p className="text-[10px] font-semibold opacity-70 mt-0.5">${ticketCost}</p>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1 max-h-[140px] overflow-y-auto">
                          {market.outcomes.map((outcome, index) => {
                            const isSelected = selectedOutcome?.label === outcome.label;
                            const ticketCost = (outcome.price / 100).toFixed(2);
                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedOutcome(outcome)}
                                className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 transition-all active:scale-[0.98] border text-left ${
                                  isSelected ? 'border-primary bg-primary/10 ring-1 ring-primary/30' : 'border-border/30 hover:border-border/60'
                                }`}
                              >
                                {outcome.logo ? (
                                  <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm" />
                                ) : (
                                  <div className="h-4 w-4 rounded-sm bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">{outcome.label.charAt(0)}</div>
                                )}
                                <span className="flex-1 text-xs font-medium truncate">{outcome.label}</span>
                                <span className="text-[10px] text-muted-foreground mr-1">${ticketCost}</span>
                                <span className="text-xs font-bold text-primary">{outcome.price}%</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Dynamic pricing note */}
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/30">
                        <TrendingUp className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <p className="text-[10px] text-muted-foreground leading-snug">
                          Ticket prices rise closer to conclusion
                        </p>
                      </div>
                    </div>

                    {/* Entry Amount */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground font-medium uppercase tracking-widest">Amount</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Wallet className="h-2.5 w-2.5" />
                          <span>$5,230</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-6 h-9 text-sm font-semibold bg-background"
                          min="1"
                          max="10000"
                          step="1"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {quickAmounts.map((qa) => (
                          <Button
                            key={qa}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(qa.toString())}
                            className={`h-6 text-[10px] px-0 rounded-md ${amount === qa.toString() ? 'border-primary bg-primary/5 text-primary' : ''}`}
                          >
                            ${qa}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* If You Win - enhanced */}
                    <div className="p-2.5 rounded-lg bg-muted/30 space-y-1.5">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">If you win</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Entry</span>
                        <span className="font-medium">${amountNum.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Payout</span>
                        <span className="font-bold">${payout.toFixed(2)}</span>
                      </div>
                      <Separator className="!my-1 bg-border/40" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Winnings</span>
                        <span className={`text-lg font-bold ${winnings > 0 ? 'text-success' : 'text-foreground'}`}>
                          +${winnings.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[9px] text-muted-foreground leading-snug">
                        ⚡ Winners split the pot — winnings may fluctuate.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Buy Button + Pot Split */}
              {!isAwaitingResolution && (
                <div className="p-4 pt-0 space-y-2.5">
                  <Button
                    className="w-full h-10 font-semibold text-sm [background:var(--gradient-primary)] hover:opacity-90 transition-opacity"
                    onClick={handleBuy}
                    disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}
                  >
                    {isSubmitting
                      ? "Placing entry..."
                      : selectedOutcome
                        ? `Enter ${selectedOutcome.label} $${amountNum.toFixed(2)} → Win $${payout.toFixed(2)}`
                        : "Select outcome"
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
