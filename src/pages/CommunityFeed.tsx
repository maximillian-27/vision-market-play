import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FollowingSidebar } from "@/components/FollowingSidebar";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { CommunityPost, CommunityPostData } from "@/components/CommunityPost";
import { Image, ChartBar, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

const mockMarkets = [
  { id: "1", title: "Will Bitcoin reach $100,000 by end of 2025?", image: bitcoinImage, yesPrice: 68, noPrice: 32, volume: "$2.4M" },
  { id: "2", title: "Who will win the NBA Championship this season?", image: nbaImage, yesPrice: 55, noPrice: 45, volume: "$890K" },
  { id: "3", title: "Will Apple release a foldable iPhone in 2025?", image: iphoneImage, yesPrice: 23, noPrice: 77, volume: "$1.2M" },
  { id: "4", title: "Next US Federal Reserve interest rate decision?", image: fedImage, yesPrice: 45, noPrice: 55, volume: "$3.1M" },
  { id: "5", title: "Will AI replace 25% of customer service jobs by 2026?", image: aiImage, yesPrice: 71, noPrice: 29, volume: "$1.8M" },
];

const mockPosts: CommunityPostData[] = [
  {
    id: "p1",
    type: "market",
    user: { name: "Alex Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT", username: "@alexthompson" },
    text: "This is actually more likely than people think. Institutional adoption is accelerating and the ETF approvals have brought in serious capital. I'm betting YES on this one.",
    timestamp: "2h",
    likes: 45, comments: 12, reposts: 8, bookmarks: 15,
    market: mockMarkets[0],
    recentComments: [
      { user: { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", username: "@johndoe" }, text: "Great analysis! I agree with your take.", timestamp: "1h" },
      { user: { name: "Lisa Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", username: "@lisapark" }, text: "The ETF inflows have been insane lately.", timestamp: "45m" },
    ],
  },
  {
    id: "p2",
    type: "text",
    user: { name: "David Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", username: "@davidkim" },
    text: "Hot take: AI markets are overpriced right now. The hype cycle is peaking and reality is going to set in hard in Q3. Most of these \"AI will do X by Y\" markets are trading 20-30% above where they should be.",
    timestamp: "6h",
    likes: 89, comments: 31, reposts: 22, bookmarks: 44,
  },
  {
    id: "p3",
    type: "position",
    user: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", username: "@sarahchen" },
    text: "Finally pulled the trigger on this one. The institutional momentum is undeniable.",
    timestamp: "3h",
    likes: 34, comments: 5, reposts: 3, bookmarks: 8,
    position: { side: "YES", marketTitle: "Will Bitcoin reach $100K" },
    market: mockMarkets[0],
  },
  {
    id: "p4",
    type: "repost",
    user: { name: "James Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", username: "@jameswilson" },
    text: "This is the best take I've seen on foldables 👏",
    timestamp: "5h",
    likes: 23, comments: 4, reposts: 12, bookmarks: 6,
    originalPost: {
      user: { name: "Maria Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", username: "@mariagarcia" },
      text: "Apple typically waits until technology matures before adopting it. Looking at their track record with NFC, wireless charging, etc., I think they'll skip 2025 and wait for gen 2 foldable tech.",
      timestamp: "8h",
      market: mockMarkets[2],
    },
  },
  {
    id: "p5",
    type: "market",
    user: { name: "Sophie Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie", username: "@sophiechen" },
    text: "We're already seeing this happen. Major companies are replacing tier-1 support with AI chatbots. The question isn't IF but WHEN we hit 25%. My company just laid off 30% of our support team last month.",
    timestamp: "8h",
    likes: 134, comments: 48, reposts: 31, bookmarks: 67,
    market: mockMarkets[4],
    recentComments: [
      { user: { name: "Mike J", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", username: "@mikej" }, text: "That's wild. What industry are you in?", timestamp: "7h" },
    ],
  },
  {
    id: "p6",
    type: "text",
    user: { name: "Maria Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", username: "@mariagarcia" },
    text: "The Fed has been pretty clear about their stance. With inflation cooling down but still above target, I think they hold steady. Too risky to cut now. Anyone else feeling bearish on cuts?",
    timestamp: "10h",
    likes: 56, comments: 19, reposts: 7, bookmarks: 12,
  },
];

const currentUser = {
  name: "Sarah Chen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  username: "@sarahchen",
};

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");
  const [postContent, setPostContent] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if (!postContent.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      setPostContent("");
      setSelectedMarket(null);
      setIsPosting(false);
    }, 500);
  };

  const selectedMarketData = selectedMarket ? mockMarkets.find((m) => m.id === selectedMarket) : null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex gap-6 justify-center">
        <FollowingSidebar />

        {/* Main Feed Column */}
        <div className="w-full max-w-[600px] border-x border-border/40 min-h-screen">
          {/* Sticky Tab Bar */}
          <div className="sticky top-14 z-20 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="flex">
              {(["foryou", "following"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3.5 text-sm font-medium relative transition-colors hover:bg-muted/30"
                >
                  <span className={activeTab === tab ? "text-foreground" : "text-muted-foreground"}>
                    {tab === "foryou" ? "For You" : "Following"}
                  </span>
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="border-b border-border/40 px-4 py-3">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[44px] text-base bg-transparent border-0 resize-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
                  maxLength={280}
                />
                {selectedMarketData && (
                  <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 mt-1">
                    <img src={selectedMarketData.image} alt="" className="h-5 w-5 rounded object-cover" />
                    <span className="text-sm truncate flex-1">{selectedMarketData.title}</span>
                    <button onClick={() => setSelectedMarket(null)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-1">
                    <Select value={selectedMarket || "none"} onValueChange={(v) => setSelectedMarket(v === "none" ? null : v)}>
                      <SelectTrigger className="h-8 w-8 p-0 border-0 bg-transparent hover:bg-primary/10 [&>svg]:hidden text-primary/70 hover:text-primary">
                        <ChartBar className="h-[18px] w-[18px]" />
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectItem value="none">No market</SelectItem>
                        {mockMarkets.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            <span className="truncate max-w-[200px] block">{m.title}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${postContent.length > 250 ? "text-destructive" : "text-muted-foreground"}`}>
                      {postContent.length}/280
                    </span>
                    <Button
                      size="sm"
                      onClick={handlePost}
                      disabled={!postContent.trim() || isPosting}
                      className="rounded-full px-5 font-bold"
                    >
                      {isPosting ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div>
            {mockPosts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  );
}
