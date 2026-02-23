import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const allMarkets = [
  { id: "1", title: "Will Bitcoin reach $100K by June 2026?", odds: 68, category: "Crypto" },
  { id: "2", title: "NBA Championship winner 2026?", odds: 32, category: "Sports" },
  { id: "3", title: "Will Apple release a foldable iPhone in 2026?", odds: 23, category: "Tech" },
  { id: "4", title: "Fed interest rate decision - March 2026?", odds: 45, category: "Politics" },
  { id: "5", title: "Will AI replace 50% of customer service jobs by 2027?", odds: 56, category: "Tech" },
  { id: "6", title: "Tesla stock above $400 by end of 2026?", odds: 41, category: "Finance" },
  { id: "7", title: "Will there be a TikTok ban in the US?", odds: 18, category: "Politics" },
  { id: "8", title: "Champions League winner 2026?", odds: 29, category: "Sports" },
  { id: "9", title: "Ethereum flippening Bitcoin by market cap?", odds: 8, category: "Crypto" },
  { id: "10", title: "Next US presidential election winner?", odds: 52, category: "Politics" },
];

const allPlayers = [
  { id: "1", name: "Sarah Chen", username: "sarahchen", avatar: "Sarah", role: "Creator", followers: 12300 },
  { id: "2", name: "Alex Thompson", username: "alexthompson", avatar: "Alex", role: "Player", followers: 234 },
  { id: "3", name: "Maria Garcia", username: "mariagarcia", avatar: "Maria", role: "Creator", followers: 8900 },
  { id: "4", name: "James Wilson", username: "jameswilson", avatar: "James", role: "Player", followers: 1200 },
  { id: "5", name: "Emma Davis", username: "emmadavis", avatar: "Emma", role: "Creator", followers: 5600 },
  { id: "6", name: "Michael Brown", username: "michaelbrown", avatar: "Michael", role: "Player", followers: 890 },
  { id: "7", name: "Lisa Anderson", username: "lisaanderson", avatar: "Lisa", role: "Player", followers: 3400 },
  { id: "8", name: "David Kim", username: "davidkim", avatar: "David", role: "Creator", followers: 15200 },
];

function formatFollowers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

interface SearchDropdownProps {
  /** If true, renders as a full-width input (for mobile dialog usage) */
  embedded?: boolean;
  onResultClick?: () => void;
}

export function SearchDropdown({ embedded = false, onResultClick }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"markets" | "players">("markets");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredMarkets = allMarkets
    .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  const filteredPlayers = allPlayers
    .filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.username.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const showDropdown = embedded || isOpen;

  // Close on outside click (desktop only)
  useEffect(() => {
    if (embedded) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [embedded]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      onResultClick?.();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleMarketClick = (id: string) => {
    navigate(`/market/${id}`);
    setIsOpen(false);
    setQuery("");
    onResultClick?.();
  };

  const handlePlayerClick = (username: string) => {
    navigate(`/creator/${username}`);
    setIsOpen(false);
    setQuery("");
    onResultClick?.();
  };

  return (
    <div ref={containerRef} className={cn("relative", !embedded && "flex-1 max-w-sm ml-auto")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search markets or players..."
          className={cn(
            "pl-9 text-sm",
            embedded
              ? "h-11"
              : "h-9 bg-secondary border-transparent hover:bg-secondary-hover focus-visible:bg-background focus-visible:border-border rounded-lg"
          )}
        />
      </div>

      {showDropdown && (
        <div
          className={cn(
            "bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-[100]",
            embedded ? "mt-3" : "absolute top-full left-0 right-0 mt-1.5"
          )}
        >
          {/* Tab pills */}
          <div className="flex gap-1 p-2 border-b border-border/50">
            <button
              onClick={() => setActiveTab("markets")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeTab === "markets"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Markets
            </button>
            <button
              onClick={() => setActiveTab("players")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeTab === "players"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Users className="h-3.5 w-3.5" />
              Players
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[280px] overflow-y-auto">
            {activeTab === "markets" ? (
              filteredMarkets.length > 0 ? (
                filteredMarkets.map((market) => (
                  <button
                    key={market.id}
                    onClick={() => handleMarketClick(market.id)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-secondary/70 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{market.title}</p>
                      <p className="text-[11px] text-muted-foreground">{market.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary flex-shrink-0">
                      {market.odds}%
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No markets found
                </div>
              )
            ) : (
              filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => handlePlayerClick(player.username)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/70 transition-colors text-left"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}`} />
                      <AvatarFallback className="text-xs">{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{player.name}</span>
                        <span className="text-xs text-muted-foreground">@{player.username}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Badge variant="muted" className="text-[10px] px-1.5 py-0">{player.role}</Badge>
                        <span>{formatFollowers(player.followers)} followers</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No players found
                </div>
              )
            )}
          </div>

          {/* Footer hint */}
          {query.trim() && (
            <div className="px-3 py-2 border-t border-border/50 text-center">
              <span className="text-[11px] text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-[10px] font-mono">Enter</kbd> for all results
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
