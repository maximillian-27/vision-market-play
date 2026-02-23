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
import { 
  Clock, Users, BadgeCheck, Wallet, Share2, ChevronDown, ChevronUp,
  Scale, Ticket, TrendingUp, Zap, ExternalLink, Bookmark, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
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

const buySchema = z.object({
  amount: z.number().min(1, { message: "Minimum entry is $1" }).max(10000, { message: "Maximum entry is $10,000" })
});

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const description = market.description || "This market tracks the prediction outcome based on official announcements and verified data sources.";
  const resolutionCriteria = market.resolutionCriteria || "This market resolves based on official announcements from primary sources before the end date.";

  const isBinary = market.outcomes.length === 2 && 
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");
  
  const isAwaitingResolution = market.status === "awaiting_resolution";
  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? amountNum / (selectedPrice / 100) : 0;
  const winnings = payout - amountNum;
  const potDisplay = market.pot ? formatPot(market.pot) : market.volume;

  // Pre-select the leading outcome for immediate engagement
  useEffect(() => {
    if (open && !selectedOutcome && market.outcomes.length > 0) {
      const leading = [...market.outcomes].sort((a, b) => b.price - a.price)[0];
      setSelectedOutcome(leading);
    }
  }, [open, market.outcomes]);

  // Calculate win potential based on lowest-priced outcome (best odds)
  const lowestPrice = Math.min(...market.outcomes.map(o => o.price).filter(p => p > 0));
  const winPotential = lowestPrice > 0 ? (10 / (lowestPrice / 100)).toFixed(0) : "0";

  const quickAmounts = [5, 10, 25, 50, 100];

  // Simulated live activity
  const recentEntries = Math.floor(Math.random() * 40) + 15;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({ title: "Select an outcome", description: "Please select an outcome before placing an entry", variant: "destructive" });
      return;
    }
    try {
      buySchema.parse({ amount: amountNum });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({ title: "Entry placed! 🎉", description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"` });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 600);
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
      setShowDetails(false);
    }
    onOpenChange(isOpen);
  };

  const handleViewFullPage = () => {
    onOpenChange(false);
    navigate(`/market/${market.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden max-h-[90vh] rounded-2xl border-border/60">
        <div className="max-h-[90vh] overflow-y-auto">

        {/* ─── Compact Header with Image ─── */}
        <div className="relative">
          {/* Small image strip */}
          <div className="h-28 overflow-hidden relative">
            <img src={market.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          {/* Floating actions */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
            <button 
              onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`); toast({ title: "Link copied!" }); }}
              className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => { setIsBookmarked(!isBookmarked); toast({ title: isBookmarked ? "Removed" : "Saved" }); }}
              className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>

          {/* Pot badge overlapping image bottom */}
          <div className="absolute -bottom-3 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border shadow-md text-sm font-extrabold text-primary">
              {potDisplay} Pot
            </span>
          </div>
        </div>

        {/* ─── Scrollable Content ─── */}
          <div className="px-5 pt-6 pb-5 space-y-5">

            {/* Title — THE most important element */}
            <h2 className="text-lg font-bold leading-snug pr-4">{market.title}</h2>

            {/* Stats row — social proof + urgency */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={market.creator.avatar} />
                  <AvatarFallback className="text-[8px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{market.creator.name}</span>
                {market.creator.isCreator !== false && <BadgeCheck className="h-3 w-3 text-primary fill-primary/20" />}
              </div>
              <span className="text-border">·</span>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{formatNumber(market.players || market.traders || 0)}</span>
              </div>
              <span className="text-border">·</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{market.endsIn}</span>
              </div>
            </div>

            {/* Live activity badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/8 border border-success/15 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[11px] font-semibold text-success">{recentEntries} entries in the last hour</span>
            </div>

            <Separator className="opacity-40" />

            {/* ─── TRADE SECTION ─── */}
            {isAwaitingResolution ? (
              <div className="p-5 rounded-xl bg-muted/40 border border-border/50 text-center space-y-2">
                <Clock className="h-5 w-5 text-muted-foreground mx-auto" />
                <p className="text-sm font-semibold">Entries Closed</p>
                <p className="text-xs text-muted-foreground">Awaiting resolution{market.resolutionDate ? ` · ${market.resolutionDate}` : ''}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Win Potential Teaser — ABOVE outcomes for max visibility */}
                <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-success/8 border border-success/15">
                  <Ticket className="h-4 w-4 text-success" />
                  <span className="text-sm font-bold text-success">Win up to ${winPotential} per $10 ticket</span>
                </div>

                {/* Outcome Selection */}
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">Pick your outcome</span>
                  
                  {isBinary ? (
                    <div className="space-y-3">
                      {/* Probability bar */}
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-success w-10">{market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price}%</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-success to-success/70" style={{ width: `${market.outcomes.find(o => o.label.toLowerCase() === "yes")?.price}%` }} />
                        </div>
                        <span className="text-muted-foreground w-10 text-right">{market.outcomes.find(o => o.label.toLowerCase() === "no")?.price}%</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2.5">
                        {market.outcomes.map((outcome, index) => {
                          const isYes = outcome.label.toLowerCase() === "yes";
                          const isSelected = selectedOutcome?.label === outcome.label;
                          return (
                            <button key={index} onClick={() => setSelectedOutcome(outcome)}
                              className={`rounded-xl py-4 text-center transition-all active:scale-[0.97] border-2 ${
                                isSelected
                                  ? isYes 
                                    ? 'border-success bg-success/12 text-success shadow-sm ring-1 ring-success/20' 
                                    : 'border-destructive bg-destructive/12 text-destructive shadow-sm ring-1 ring-destructive/20'
                                  : isYes 
                                    ? 'border-success/25 bg-success/5 text-success hover:bg-success/10 hover:border-success/40' 
                                    : 'border-destructive/25 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:border-destructive/40'
                              }`}>
                              <span className="text-lg font-extrabold uppercase">{outcome.label}</span>
                              <span className="block text-xs font-semibold mt-0.5 opacity-70">{outcome.price}¢ / ticket</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {market.outcomes.map((outcome, index) => {
                        const isSelected = selectedOutcome?.label === outcome.label;
                        return (
                          <button key={index} onClick={() => setSelectedOutcome(outcome)}
                            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all active:scale-[0.98] border ${
                              isSelected 
                                ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20' 
                                : 'border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-border'
                            }`}>
                            {outcome.logo ? (
                              <img src={outcome.logo} alt={outcome.label} className="h-6 w-6 object-contain rounded-sm" />
                            ) : (
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{outcome.label.charAt(0)}</div>
                            )}
                            <span className="text-sm font-semibold flex-1 text-left">{outcome.label}</span>
                            <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>{outcome.price}%</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Entry amount</span>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-base">$</span>
                    <Input
                      type="number"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 h-12 text-lg font-bold bg-muted/20 border-border/50 focus:border-primary"
                      min="1"
                      max="10000"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {quickAmounts.map((qa) => (
                      <button key={qa} onClick={() => setAmount(qa.toString())}
                        className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                          amount === qa.toString()
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'bg-muted/40 text-muted-foreground border border-transparent hover:bg-muted'
                        }`}>
                        ${qa}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout Summary — compact and impactful */}
                <div className="rounded-xl bg-muted/20 border border-border/40 p-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Your entry</span>
                    <span className="font-semibold">${amountNum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Ticket price</span>
                    <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}¢` : '—'}</span>
                  </div>
                  <Separator className="opacity-30" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">If you win</span>
                    <span className="text-lg font-extrabold text-success">{selectedOutcome ? `$${payout.toFixed(2)}` : '—'}</span>
                  </div>
                  {selectedOutcome && winnings > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Profit</span>
                      <span className="font-bold text-success">+${winnings.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* CTA Button — large, bold, action-oriented */}
                <Button
                  className="w-full h-13 text-base font-bold rounded-xl"
                  size="lg"
                  onClick={handleBuy}
                  disabled={!selectedOutcome || isSubmitting || amountNum < 1}
                >
                  {isSubmitting ? (
                    "Placing entry..."
                  ) : selectedOutcome ? (
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Enter {selectedOutcome.label} · ${amountNum.toFixed(2)}
                    </span>
                  ) : (
                    "Select an outcome"
                  )}
                </Button>
              </div>
            )}

            <Separator className="opacity-40" />

            {/* ─── DETAILS — Collapsed by default, doesn't compete with trade ─── */}
            <Collapsible open={showDetails} onOpenChange={setShowDetails}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 group">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Market Details & Resolution</span>
                </div>
                {showDetails ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 pt-3">
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Description</span>
                    <p className="text-sm text-foreground/80 leading-relaxed mt-1">{description}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Scale className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Resolution Criteria</span>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{resolutionCriteria}</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Full Page Link */}
            <button 
              onClick={handleViewFullPage}
              className="flex items-center justify-center gap-1.5 w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View full page with comments & chart</span>
            </button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
