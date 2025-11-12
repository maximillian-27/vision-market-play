import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Clock, Users, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data - in a real app this would come from an API
const mockMarketData: Record<string, any> = {
  "1": {
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    description: "This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, or Kraken) before 11:59 PM ET on December 31, 2025. The price must be sustained for at least 5 minutes.",
    resolutionCriteria: "The market will resolve based on data from CoinGecko's Bitcoin price index. A screenshot of the price exceeding $100,000 for at least 5 consecutive minutes will be required. If there are disputes, the median price across the three exchanges (Coinbase, Binance, Kraken) will be used.",
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endsIn: "3 months",
    traders: "12.4K",
    liquidity: "$450K",
    priceHistory: [
      { date: "Jan", yes: 45, no: 55 },
      { date: "Feb", yes: 52, no: 48 },
      { date: "Mar", yes: 58, no: 42 },
      { date: "Apr", yes: 62, no: 38 },
      { date: "May", yes: 68, no: 32 },
    ]
  },
  // Add more markets as needed
};

export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const market = mockMarketData[id || "1"];

  if (!market) {
    return <div className="p-4">Market not found</div>;
  }

  const getOutcomeColor = (color?: string) => {
    switch (color) {
      case "success": return "border-success text-success hover:bg-success hover:text-success-foreground";
      case "destructive": return "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground";
      default: return "border-primary text-primary hover:bg-primary hover:text-primary-foreground";
    }
  };

  return (
    <div className="w-full md:container md:max-w-4xl md:py-6 pb-4">
      {/* Back Button */}
      <div className="sticky top-14 z-10 bg-background border-b md:border-0 px-4 py-3 md:py-4 md:px-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="space-y-4 px-4 md:px-0">
        {/* Market Header */}
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback>{market.creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{market.creator.name}</p>
                <p className="text-xs text-muted-foreground">Market Creator</p>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold leading-tight">{market.title}</h1>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Volume</span>
                </div>
                <p className="font-semibold">{market.volume}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Traders</span>
                </div>
                <p className="font-semibold">{market.traders}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Liquidity</span>
                </div>
                <p className="font-semibold">{market.liquidity}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Ends In</span>
                </div>
                <p className="font-semibold">{market.endsIn}</p>
              </div>
            </div>

            {/* Outcome Buttons */}
            <div className={`grid gap-3 ${market.outcomes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {market.outcomes.map((outcome: any, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`flex-col h-auto py-4 ${getOutcomeColor(outcome.color)}`}
                >
                  <span className="font-bold text-lg">{outcome.price}¢</span>
                  <span className="text-sm">{outcome.label}</span>
                </Button>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Price Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={market.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yes" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Yes"
                  dot={{ fill: "hsl(var(--success))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="no" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="No"
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Details Tabs */}
        <Card>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:w-auto md:inline-grid">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="resolution">Resolution</TabsTrigger>
            </TabsList>
            
            <Separator className="mb-4" />
            
            <TabsContent value="description" className="px-6 pb-6 space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">Market Description</h3>
              <p className="text-sm leading-relaxed">{market.description}</p>
            </TabsContent>
            
            <TabsContent value="resolution" className="px-6 pb-6 space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">Resolution Criteria</h3>
              <p className="text-sm leading-relaxed">{market.resolutionCriteria}</p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
