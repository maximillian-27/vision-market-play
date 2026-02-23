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
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { 
  Clock, Users, BadgeCheck, Wallet, Share2, ChevronDown, ChevronUp,
  FileText, Scale, Send, Heart, MessageCircle, ExternalLink, Bookmark, Timer, Ticket
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
    creator: { name: string; avatar: string; id?: string; isCreator?: boolean };
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

function formatNumber(num: number) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

const getMockMarketDetails = (marketId: string) => ({
  description: "This market tracks the prediction outcome based on official announcements and verified data sources. The resolution will be determined by the primary outcome at the specified end date.",
  resolutionCriteria: "This market resolves to YES if the specified outcome occurs before the end date. Resolution is based on official announcements from primary sources.",
  priceHistory: [
    { date: "Jan 1", price: 42 }, { date: "Feb 1", price: 52 }, { date: "Mar 1", price: 55 },
    { date: "Apr 1", price: 62 }, { date: "May 1", price: 68 }, { date: "Now", price: 68 },
  ],
  comments: [
    { id: "1", author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" }, text: "Looking bullish on this one. The fundamentals are strong.", timestamp: "2h", likes: 24 },
    { id: "2", author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" }, text: "I'm taking the other side here. Too much uncertainty.", timestamp: "4h", likes: 12 },
  ],
});

const buySchema = z.object({
  amount: z.number().min(1, { message: "Minimum entry is $1" }).max(10000, { message: "Maximum entry is $10,000" })
});

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const mockDetails = getMockMarketDetails(market.id);
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const priceHistory = market.priceHistory || mockDetails.priceHistory;
  const comments = market.comments || mockDetails.comments;

  const isBinary = market.outcomes.length === 2 && 
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");
  
  const isAwaitingResolution = market.status === "awaiting_resolution";
  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? amountNum / (selectedPrice / 100) : 0;
  const winnings = payout - amountNum;
  const potDisplay = market.pot ? formatPot(market.pot) : market.volume;

  const lowestPrice = Math.min(...market.outcomes.map(o => o.price).filter(p => p > 0));
  const winPotential = lowestPrice > 0 ? (10 / (lowestPrice / 100)).toFixed(0) : "0";

  const quickAmounts = [5, 10, 25, 50, 100];

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({ title: "Select an outcome", description: "Please select an outcome before placing an entry", variant: "destructive" });
      return;
    }
    try {
      buySchema.parse({ amount: amountNum });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({ title: "Entry placed!", description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"` });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Invalid amount", description: error.errors[0].message, variant: "destructive" });
      }
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setAmount("10");
      setShowResolution(false);
    }
    onOpenChange(isOpen);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    toast({ title: "Comment posted" });
    setCommentText("");
  };

  const handleViewFullPage = () => {
    onOpenChange(false);
    navigate(`/market/${market.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 overflow-hidden max-h-[92vh] flex flex-col rounded-2xl">
        {/* Two Column Layout */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* ─── LEFT: Market Content ─── */}
          <ScrollArea className="flex-1 border-r border-border/40">
            <div className="flex flex-col">
              {/* Hero Image */}
              <div className="relative w-full aspect-[5/2] overflow-hidden">
                <img src={market.image} alt={market.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-primary text-sm font-extrabold shadow-lg">
                    {potDisplay} Pot
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Creator Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 ring-2 ring-border">
                      <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                      <AvatarFallback className="text-[10px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">{market.creator.name}</span>
                        {market.creator.isCreator !== false && <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />}
                      </div>
                      <span className="text-[10px] text-muted-foreground">Creator</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`); toast({ title: "Link copied!" }); }}>
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className={`h-7 w-7 ${isBookmarked ? 'text-primary' : ''}`} onClick={() => { setIsBookmarked(!isBookmarked); toast({ title: isBookmarked ? "Removed" : "Saved to watchlist" }); }}>
                      <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-primary' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground" onClick={handleViewFullPage}>
                      <ExternalLink className="h-3 w-3" /> Full page
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold leading-snug">{market.title}</h2>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span className="font-semibold text-foreground">{formatNumber(market.players || 0)}</span>
                    <span>players</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{market.endsIn}</span>
                  </div>
                </div>

                {/* Chart */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    {["1D", "1W", "1M", "All"].map((tf, i) => (
                      <button key={tf} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${i === 3 ? 'bg-muted text-foreground' : 'bg-muted/40 hover:bg-muted text-muted-foreground'}`}>
                        {tf}
                      </button>
                    ))}
                  </div>
                  <div className="h-36 rounded-xl overflow-hidden bg-muted/20 p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceHistory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="dialogChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} interval="preserveStartEnd" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px", padding: "6px 10px" }}
                          formatter={(value: any) => [`${value}% chance`, "Probability"]}
                        />
                        <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#dialogChartGradient)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Description</span>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{description}</p>
                </div>

                {/* Resolution Criteria */}
                <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Scale className="h-3.5 w-3.5" />
                      <span>Resolution Criteria</span>
                    </div>
                    {showResolution ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3 px-1">{resolutionCriteria}</p>
                  </CollapsibleContent>
                </Collapsible>

                {/* Engagement Row */}
                <div className="flex items-center gap-5 py-2 border-t border-b border-border/40">
                  <button onClick={() => { setIsLiked(!isLiked); }} className="flex items-center gap-1.5 active:scale-95 transition-transform">
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
                    <span className="text-xs font-medium">342</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{comments.length}</span>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    Comments ({comments.length})
                  </h3>

                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                        className="pr-9 h-9 text-xs"
                      />
                      {commentText.trim() && (
                        <button onClick={handleComment} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary">
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2.5">
                        <Avatar className="h-7 w-7 flex-shrink-0">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback className="text-[8px]">{comment.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="bg-muted/30 rounded-xl px-3 py-2 border border-border/30">
                            <span className="font-semibold text-xs">{comment.author.username}</span>
                            <p className="text-xs text-foreground/90 mt-0.5">{comment.text}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-1 px-1 text-[10px] text-muted-foreground">
                            <span>{comment.timestamp}</span>
                            <button className="flex items-center gap-0.5 hover:text-foreground transition-colors">
                              <Heart className="h-2.5 w-2.5" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="font-medium hover:text-foreground transition-colors">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* ─── RIGHT: Trade Panel ─── */}
          <div className="w-[300px] flex-shrink-0 flex flex-col bg-card">
            <div className="p-5 space-y-4 flex-1 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Place Entry</span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wallet className="h-3.5 w-3.5" />
                  <span>$5,230</span>
                </div>
              </div>

              {isAwaitingResolution ? (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Entries Closed</p>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting resolution</p>
                  {market.resolutionDate && <p className="text-xs text-blue-500 mt-1">{market.resolutionDate}</p>}
                </div>
              ) : (
                <>
                  {/* Outcome Selection */}
                  {isBinary ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-success w-10">{market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price}%</span>
                        <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-success to-success/80" style={{ width: `${market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price}%` }} />
                        </div>
                        <span className="text-muted-foreground w-10 text-right">{market.outcomes.find(o => o.label.toLowerCase() === "no")?.price}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {market.outcomes.map((outcome, index) => {
                          const isYes = outcome.label.toLowerCase() === "yes";
                          const isSelected = selectedOutcome?.label === outcome.label;
                          return (
                            <button key={index} onClick={() => setSelectedOutcome(outcome)}
                              className={`rounded-xl py-3.5 text-center transition-all active:scale-[0.98] border-2 ${
                                isSelected
                                  ? isYes ? 'border-success bg-success/15 text-success shadow-sm' : 'border-destructive bg-destructive/15 text-destructive shadow-sm'
                                  : isYes ? 'border-success/30 bg-success/5 text-success hover:bg-success/10' : 'border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10'
                              }`}>
                              <span className="text-base font-bold uppercase">{outcome.label}</span>
                              <span className="block text-xs font-semibold mt-0.5 opacity-70">{outcome.price}¢</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {market.outcomes.map((outcome, index) => {
                        const isSelected = selectedOutcome?.label === outcome.label;
                        return (
                          <button key={index} onClick={() => setSelectedOutcome(outcome)}
                            className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all active:scale-[0.98] border ${
                              isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border/50 bg-secondary/40 hover:bg-secondary/70'
                            }`}>
                            {outcome.logo ? (
                              <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain rounded-sm" />
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{outcome.label.charAt(0)}</div>
                            )}
                            <span className="text-sm font-semibold flex-1 text-left">{outcome.label}</span>
                            <span className="text-sm font-bold text-primary">{outcome.price}%</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                        className="pl-7 h-11 text-base font-semibold bg-muted/30 border-border/50 focus:border-primary" min="1" max="10000" />
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {quickAmounts.map((qa) => (
                        <button key={qa} onClick={() => setAmount(qa.toString())}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            amount === qa.toString() ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
                          }`}>
                          ${qa}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payout Summary */}
                  <div className="rounded-xl bg-muted/30 border border-border/50 p-3.5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Your Entry</span>
                      <span className="font-semibold">${amountNum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Ticket Price</span>
                      <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}¢` : '—'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">If you win</span>
                      <span className="font-bold">{selectedOutcome ? `$${payout.toFixed(2)}` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Potential Winnings</span>
                      <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
                        {selectedOutcome ? `+$${winnings.toFixed(2)}` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Win Teaser */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-success font-bold">
                    <Ticket className="h-3.5 w-3.5" />
                    <span>Win up to ${winPotential} per $10 ticket</span>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Buy Button */}
            {!isAwaitingResolution && (
              <div className="p-5 pt-0">
                <Button className="w-full h-11 font-semibold text-sm" onClick={handleBuy}
                  disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}>
                  {isSubmitting ? "Placing entry..." : selectedOutcome ? `Enter ${selectedOutcome.label} • $${amountNum.toFixed(2)}` : "Select an outcome"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
