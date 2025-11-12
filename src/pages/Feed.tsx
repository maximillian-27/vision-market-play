import { FeedFilters } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
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
      id: "sarah-chen",
      isCreator: true,
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
      id: "mike-johnson",
      isCreator: true,
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
      id: "emma-wilson",
      isCreator: true,
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
      id: "alex-rodriguez",
      isCreator: true,
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
      id: "jordan-lee",
      isCreator: true,
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
  {
    id: "6",
    creator: {
      name: "Taylor Swift",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      id: "taylor-swift",
      isCreator: true,
    },
    title: "Will Tesla launch a $25,000 electric car in 2025?",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=800&fit=crop",
    yesPrice: 42,
    noPrice: 58,
    volume: "$987K",
    endsIn: "8 months",
    likes: 154,
    comments: 41,
  },
  {
    id: "7",
    creator: {
      name: "David Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      id: "david-park",
      isCreator: true,
    },
    title: "Will SpaceX successfully land humans on Mars by 2028?",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=800&fit=crop",
    yesPrice: 18,
    noPrice: 82,
    volume: "$2.1M",
    endsIn: "2 years",
    likes: 289,
    comments: 78,
  },
  {
    id: "8",
    creator: {
      name: "Lisa Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      id: "lisa-martinez",
      isCreator: true,
    },
    title: "Which streaming service will have the most subscribers in 2025?",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=800&fit=crop",
    outcomes: [
      { label: "Netflix", price: 45 },
      { label: "Disney+", price: 28 },
      { label: "Prime", price: 15 },
      { label: "Other", price: 12 },
    ],
    volume: "$654K",
    endsIn: "9 months",
    likes: 92,
    comments: 33,
  },
  {
    id: "9",
    creator: {
      name: "Chris Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
      id: "chris-thompson",
      isCreator: true,
    },
    title: "Will Ethereum surpass $5,000 by end of 2025?",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=800&fit=crop",
    yesPrice: 54,
    noPrice: 46,
    volume: "$1.7M",
    endsIn: "7 months",
    likes: 187,
    comments: 56,
  },
  {
    id: "10",
    creator: {
      name: "Nina Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
      id: "nina-patel",
      isCreator: true,
    },
    title: "Will a new iPhone model include USB-C charging?",
    image: "https://images.unsplash.com/photo-1592286927505-2fd027c9ff06?w=800&h=800&fit=crop",
    yesPrice: 89,
    noPrice: 11,
    volume: "$543K",
    endsIn: "4 months",
    likes: 134,
    comments: 29,
  },
  {
    id: "11",
    creator: {
      name: "Robert Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      id: "robert-kim",
      isCreator: true,
    },
    title: "Who will win the next US Presidential election?",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=800&fit=crop",
    outcomes: [
      { label: "Democrat", price: 52, color: "primary" },
      { label: "Republican", price: 44, color: "destructive" },
      { label: "Independent", price: 4 },
    ],
    volume: "$5.2M",
    endsIn: "6 months",
    likes: 421,
    comments: 156,
  },
  {
    id: "12",
    creator: {
      name: "Sophie Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      id: "sophie-anderson",
      isCreator: true,
    },
    title: "Will global temperatures rise by 1.5°C by 2030?",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=800&fit=crop",
    yesPrice: 73,
    noPrice: 27,
    volume: "$876K",
    endsIn: "4 years",
    likes: 198,
    comments: 87,
  },
];

export default function Feed() {
  return (
    <div className="w-full px-2 md:px-4 lg:px-6 lg:py-6">
      <div className="space-y-4 md:space-y-6">
        <div className="py-4 lg:py-0">
          <FeedFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {mockMarkets.map((market, index) => (
            <MarketGridCard 
              key={index} 
              id={market.id}
              creator={market.creator}
              title={market.title}
              image={market.image}
              outcomes={market.outcomes}
              yesPrice={market.yesPrice}
              noPrice={market.noPrice}
              volume={market.volume}
              endsIn={market.endsIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
