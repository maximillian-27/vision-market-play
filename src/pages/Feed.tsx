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
    title: "Will the Lakers make the NBA playoffs this season?",
    image: "/placeholder.svg",
    yesPrice: 45,
    noPrice: 55,
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
    title: "Will AI replace 25% of customer service jobs by 2026?",
    image: "/placeholder.svg",
    yesPrice: 71,
    noPrice: 29,
    volume: "$3.1M",
    endsIn: "1 year",
  },
];

export default function Feed() {
  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <FeedFilters />
      <div className="space-y-4">
        {mockMarkets.map((market, index) => (
          <MarketCard key={index} {...market} />
        ))}
      </div>
    </div>
  );
}
