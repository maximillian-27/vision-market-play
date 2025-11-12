import { FeedFilters } from "@/components/FeedFilters";
import { MarketCard } from "@/components/MarketCard";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

const mockMarkets = [
  {
    id: "1",
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
    likes: 142,
    comments: 38,
  },
  {
    id: "2",
    creator: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    title: "Who will win the NBA Championship this season?",
    subtitle: "The race for the championship is heating up. Which team takes it all?",
    image: nbaImage,
    outcomes: [
      { label: "Lakers", price: 25 },
      { label: "Celtics", price: 32 },
      { label: "Nuggets", price: 21 },
      { label: "Other", price: 22 },
    ],
    volume: "$890K",
    endsIn: "2 months",
    likes: 89,
    comments: 24,
  },
  {
    id: "3",
    creator: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's been quiet on foldables. Will they finally join the trend?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    likes: 203,
    comments: 67,
  },
  {
    id: "4",
    creator: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    title: "Next US Federal Reserve interest rate decision?",
    subtitle: "Fed's next move could shake the markets. Cut, hold, or raise?",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45, color: "success" },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17, color: "destructive" },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
    likes: 321,
    comments: 95,
  },
  {
    id: "5",
    creator: {
      name: "Jordan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    subtitle: "AI chatbots are everywhere. How much of the workforce will they replace?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
    likes: 176,
    comments: 52,
  },
];

export default function Feed() {
  return (
    <div className="w-full md:container md:max-w-2xl md:py-6 space-y-4 md:space-y-6">
      <div className="px-4 py-4 md:py-0">
        <FeedFilters />
      </div>
      <div className="space-y-0 md:space-y-4 md:px-4">
        {mockMarkets.map((market, index) => (
          <MarketCard key={index} {...market} />
        ))}
      </div>
    </div>
  );
}
