import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  BadgeCheck, 
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  Gavel,
  Timer,
  MessageCircle,
  Heart,
  Send,
  Repeat2,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuoteRepostDialog } from "@/components/QuoteRepostDialog";

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

type MarketStatus = "closed" | "resolved";

interface ResolvedMarketDialogProps {
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
    endsIn: string;
    traders?: number;
    description?: string;
    resolutionCriteria?: string;
    resolutionDescription?: string;
    priceHistory?: { date: string; price: number }[];
    comments?: Comment[];
  };
  status: MarketStatus;
  resolution: string;
  disputeEndsIn?: string;
  resolvedAt?: string;
}

const getMockMarketDetails = (marketId: string, resolution: string) => ({
  description: "This market tracks the prediction outcome based on official announcements and verified data sources. The resolution will be determined by the primary outcome at the specified end date.",
  resolutionCriteria: "This market resolves to YES if the specified outcome occurs before the end date. Resolution is based on official announcements from primary sources. In case of ambiguity, the market creator will consult with the resolution committee.",
  resolutionDescription: "The market was resolved based on official data confirming the outcome. The resolution followed the criteria outlined in the market rules and was verified by multiple trusted sources.",
  priceHistory: [
    { date: "Jan 1", price: 42 },
    { date: "Jan 15", price: 45 },
    { date: "Feb 1", price: 52 },
    { date: "Feb 15", price: 48 },
    { date: "Mar 1", price: 55 },
    { date: "Mar 15", price: 58 },
    { date: "Apr 1", price: 62 },
    { date: "Apr 15", price: 65 },
    { date: "May 1", price: 68 },
    { date: "May 15", price: 72 },
    { date: "Jun 1", price: 70 },
    { date: "End", price: resolution === "yes" ? 100 : 0 },
  ],
  comments: [
    {
      id: "1",
      author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" },
      text: "Great resolution, completely expected this outcome.",
      timestamp: "2h",
      likes: 24,
    },
    {
      id: "2",
      author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" },
      text: "The data clearly supported this resolution.",
      timestamp: "4h",
      likes: 12,
    },
  ],
});

export function ResolvedMarketDialog({ 
  open, 
  onOpenChange, 
  market,
  status,
  resolution,
  disputeEndsIn,
  resolvedAt
}: ResolvedMarketDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showResolution, setShowResolution] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const mockDetails = getMockMarketDetails(market.id, resolution.toLowerCase());
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const resolutionDescription = market.resolutionDescription || mockDetails.resolutionDescription;
  const priceHistory = market.priceHistory || mockDetails.priceHistory;
  const comments = market.comments || mockDetails.comments;

  const isDispute = status === "closed";

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
    toast({ title: "Link copied!" });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    toast({ title: "Comment posted" });
    setCommentText("");
  };

  const handleSubmitDispute = () => {
    if (!disputeReason.trim()) return;
    toast({ 
      title: "Dispute submitted",
      description: "Your dispute has been submitted for review by our resolution committee."
    });
    setDisputeReason("");
    setShowDisputeForm(false);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setShowComments(false);
      setShowDisputeForm(false);
      setDisputeReason("");
    }
    onOpenChange(isOpen);
  };

  const getOutcomeColor = (outcomeLabel: string) => {
    const label = outcomeLabel.toLowerCase();
    if (label === "yes") return "text-yes";
    if (label === "no") return "text-no";
    return "text-primary";
  };

  const getOutcomeBgColor = (outcomeLabel: string) => {
    const label = outcomeLabel.toLowerCase();
    if (label === "yes") return "bg-yes/10 border-yes/30";
    if (label === "no") return "bg-no/10 border-no/30";
    return "bg-primary/10 border-primary/30";
  };

  // Mock user position data
  const userPosition = {
    tickets: 150,
    outcome: "Yes",
    avgPrice: 0.45,
    currentValue: resolution.toLowerCase() === "yes" ? 150 : 0,
    profit: resolution.toLowerCase() === "yes" ? 82.50 : -67.50,
    isWinner: resolution.toLowerCase() === "yes"
  };

  // Mobile content
  const mobileContent = (
    <div className="flex flex-col h-full bg-background">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 flex-shrink-0">
        <button onClick={() => handleClose(false)} className="p-1">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold">Market</span>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="p-1">
            <Share2 className="h-5 w-5" />
          </button>
          <button onClick={() => setShowRepostDialog(true)} className="p-1">
            <Repeat2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Title */}
          <h2 className="text-lg font-bold leading-tight">{market.title}</h2>
          
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">{market.volume}</span>
              <span>pot</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{market.traders?.toLocaleString() || "1.2K"} players</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{market.endsIn}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div>
            {isDispute ? (
              <Badge className="bg-orange-500/20 text-orange-600 border border-orange-500/30 text-xs font-medium px-2.5 py-1">
                <Timer className="h-3.5 w-3.5 mr-1" />
                Dispute Period: {disputeEndsIn}
              </Badge>
            ) : (
              <Badge className="bg-muted text-muted-foreground border border-border text-xs font-medium px-2.5 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Resolved {resolvedAt}
              </Badge>
            )}
          </div>

          {/* Chart */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              {["1D", "1W", "1M", "All"].map((tf) => (
                <button
                  key={tf}
                  className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors first:bg-muted first:text-foreground"
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="h-44 rounded-lg overflow-hidden bg-muted/20 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mobileResolvedChartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                      padding: "6px 10px"
                    }}
                    formatter={(value: any) => [`${value}%`, "Price"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#mobileResolvedChartGradient)" 
                    strokeWidth={2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>Description</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Resolution Criteria */}
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

          {/* Resolution Summary */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Gavel className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Resolution Summary</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {resolutionDescription}
            </p>
          </div>

          {/* Comments */}
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
                
                {/* Add comment */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                    className="flex-1 h-8 text-xs px-3 rounded-md border border-border bg-background"
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
        </div>
      </ScrollArea>

      {/* Bottom Panel - Resolution Outcome */}
      <div className="border-t border-border/40 bg-muted/20 p-4 space-y-3">
        {/* Final Resolution Display */}
        <div className={`p-3 rounded-xl border ${getOutcomeBgColor(resolution)}`}>
          <div className="flex items-center gap-2 mb-2">
            {isDispute ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <Trophy className="h-4 w-4 text-primary" />
            )}
            <span className="text-xs font-semibold">
              {isDispute ? "Proposed Resolution" : "Final Outcome"}
            </span>
          </div>
          
          <div className={`text-2xl font-bold uppercase text-center py-2 ${getOutcomeColor(resolution)}`}>
            {resolution}
          </div>
          
          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                resolution.toLowerCase() === "yes" ? 'bg-yes w-full' : 
                resolution.toLowerCase() === "no" ? 'bg-no w-0' : 'bg-primary w-1/2'
              }`}
            />
          </div>
        </div>

        {/* Your Position */}
        <div className="p-3 rounded-lg bg-background border border-border/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Your Tickets</span>
            {userPosition.isWinner ? (
              <Badge className="bg-yes/20 text-yes border-yes/30 text-[10px] px-1.5 py-0">
                Winner
              </Badge>
            ) : (
              <Badge className="bg-no/20 text-no border-no/30 text-[10px] px-1.5 py-0">
                Loss
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Tickets: {userPosition.tickets} {userPosition.outcome}</span>
            <span className={`font-bold ${userPosition.profit >= 0 ? 'text-yes' : 'text-no'}`}>
              {userPosition.profit >= 0 ? '+' : ''}${userPosition.profit.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        {isDispute ? (
          !showDisputeForm ? (
            <Button
              variant="outline"
              className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10"
              onClick={() => setShowDisputeForm(true)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Dispute This Resolution
            </Button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Explain why this resolution is incorrect..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="min-h-[60px] text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setShowDisputeForm(false);
                    setDisputeReason("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={!disputeReason.trim()}
                  onClick={handleSubmitDispute}
                >
                  Submit
                </Button>
              </div>
            </div>
          )
        ) : userPosition.isWinner && (
          <Button
            className="w-full bg-yes hover:bg-yes/90 text-yes-foreground"
            onClick={() => {
              toast({
                title: "Winnings claimed!",
                description: `$${userPosition.currentValue.toFixed(2)} has been added to your wallet.`
              });
            }}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Claim ${userPosition.currentValue.toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );

  // Desktop content (Dialog)
  const desktopContent = (
    <>
      {/* Header with status badge */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
            <AvatarFallback className="text-[10px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{market.creator.name}</span>
          {market.creator.isCreator !== false && (
            <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {isDispute ? (
            <Badge className="bg-orange-500/20 text-orange-600 border border-orange-500/30 text-[10px] font-medium px-2 py-0.5">
              <Timer className="h-3 w-3 mr-1" />
              Dispute: {disputeEndsIn}
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground border border-border text-[10px] font-medium px-2 py-0.5">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Resolved
            </Badge>
          )}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => setShowRepostDialog(true)}
          >
            <Repeat2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        {/* LEFT: Market Info */}
        <ScrollArea className="flex-1 sm:border-r border-border/40">
          <div className="p-4 space-y-4">
            {/* Title & Stats */}
            <div className="space-y-2">
              <h2 className="text-base font-bold leading-tight">{market.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold text-foreground">{market.volume}</span>
                  <span>pot</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{market.traders?.toLocaleString() || "1.2K"} players</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{market.endsIn}</span>
                </div>
              </div>
            </div>

            {/* Chart showing final outcome */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Price History</span>
              </div>
              <div className="h-40 rounded-lg overflow-hidden bg-muted/20 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="resolvedChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                        padding: "6px 10px"
                      }}
                      formatter={(value: any) => [`${value}%`, "Price"]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#resolvedChartGradient)" 
                      strokeWidth={2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                <span>Description</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Resolution Criteria */}
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

            {/* Resolution Description */}
            <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Gavel className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Resolution Summary</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {resolutionDescription}
              </p>
            </div>

            {/* Comments Preview */}
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
                  
                  {/* Add comment */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                      className="flex-1 h-8 text-xs px-3 rounded-md border border-border bg-background"
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
          </div>
        </ScrollArea>

        {/* RIGHT: Resolution/Dispute Panel */}
        <div className="w-full sm:w-[280px] flex-shrink-0 bg-muted/20 flex flex-col">
          <div className="p-4 space-y-4 flex-1">
            {/* Final Resolution Display */}
            <div className={`p-4 rounded-xl border ${getOutcomeBgColor(resolution)}`}>
              <div className="flex items-center gap-2 mb-3">
                {isDispute ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <Trophy className="h-5 w-5 text-primary" />
                )}
                <span className="text-sm font-semibold">
                  {isDispute ? "Proposed Resolution" : "Final Outcome"}
                </span>
              </div>
              
              <div className={`text-3xl font-bold uppercase text-center py-3 ${getOutcomeColor(resolution)}`}>
                {resolution}
              </div>
              
              {/* Progress bar showing result */}
              <div className="h-2 rounded-full bg-muted overflow-hidden mt-3">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    resolution.toLowerCase() === "yes" ? 'bg-yes w-full' : 
                    resolution.toLowerCase() === "no" ? 'bg-no w-0' : 'bg-primary w-1/2'
                  }`}
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-background border border-border/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>Your Tickets</span>
                {userPosition.isWinner ? (
                  <Badge className="bg-yes/20 text-yes border-yes/30 text-[10px] px-1.5 py-0">
                    Winner
                  </Badge>
                ) : (
                  <Badge className="bg-no/20 text-no border-no/30 text-[10px] px-1.5 py-0">
                    Loss
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tickets held</span>
                  <span className="font-semibold">{userPosition.tickets} {userPosition.outcome}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ticket price</span>
                  <span className="font-semibold">${userPosition.avgPrice.toFixed(2)}</span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Final value</span>
                  <span className="font-semibold">${userPosition.currentValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Profit/Loss</span>
                  <span className={`font-bold ${userPosition.profit >= 0 ? 'text-yes' : 'text-no'}`}>
                    {userPosition.profit >= 0 ? '+' : ''}${userPosition.profit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Dispute Form (for closed markets) */}
            {isDispute && (
              <div className="space-y-3">
                {!showDisputeForm ? (
                  <Button
                    variant="outline"
                    className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50"
                    onClick={() => setShowDisputeForm(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Dispute This Resolution
                  </Button>
                ) : (
                  <div className="p-3 rounded-lg border border-orange-500/30 bg-orange-500/5 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Submit Dispute</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Time remaining: <span className="font-semibold text-orange-600">{disputeEndsIn}</span>
                    </p>
                    <Textarea
                      placeholder="Explain why this resolution is incorrect..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="min-h-[80px] text-sm resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setShowDisputeForm(false);
                          setDisputeReason("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        disabled={!disputeReason.trim()}
                        onClick={handleSubmitDispute}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Claim Winnings Button (for resolved markets with winning position) */}
            {!isDispute && userPosition.isWinner && (
              <Button
                className="w-full bg-yes hover:bg-yes/90 text-yes-foreground"
                onClick={() => {
                  toast({
                    title: "Winnings claimed!",
                    description: `$${userPosition.currentValue.toFixed(2)} has been added to your wallet.`
                  });
                }}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Claim ${userPosition.currentValue.toFixed(2)}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={handleClose}>
          <SheetContent side="bottom" className="h-full p-0 rounded-none border-0">
            {mobileContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-[820px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
            {desktopContent}
          </DialogContent>
        </Dialog>
      )}

      <QuoteRepostDialog
        open={showRepostDialog}
        onOpenChange={setShowRepostDialog}
        marketTitle={market.title}
        marketImage={market.image}
      />
    </>
  );
}
