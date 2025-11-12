import { FeedFilters } from "@/components/FeedFilters";
import { MarketCard } from "@/components/MarketCard";

const mockMarkets = [
  {
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    image: "/placeholder.svg",
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
  },
  {
    creator: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    title: "Who will win the NBA Championship this season?",
    image: "/placeholder.svg",
    outcomes: [
      { label: "Lakers", price: 25 },
      { label: "Celtics", price: 32 },
      { label: "Nuggets", price: 21 },
      { label: "Other", price: 22 },
    ],
    volume: "$890K",
    endsIn: "2 months",
  },
  {
    creator: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: "/placeholder.svg",
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
  },
  {
    creator: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    title: "Next US Federal Reserve interest rate decision?",
    image: "/placeholder.svg",
    outcomes: [
      { label: "Cut", price: 45, color: "success" },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17, color: "destructive" },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
  },
  {
    creator: {
      name: "Jordan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    image: "/placeholder.svg",
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
  },
];

export default function Feed() {
  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="px-4">
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
