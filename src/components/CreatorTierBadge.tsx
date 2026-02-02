import { Crown, Star, Gem, Award, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CreatorTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

interface CreatorTierBadgeProps {
  tier: CreatorTier;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const tierConfig: Record<CreatorTier, {
  label: string;
  icon: typeof Crown;
  className: string;
  description: string;
  minVolume: string;
  revenueShare: string;
}> = {
  bronze: {
    label: "Bronze",
    icon: Medal,
    className: "bg-gradient-to-r from-amber-700 to-amber-600 text-white border-amber-600",
    description: "New creator tier",
    minVolume: "$0",
    revenueShare: "1%"
  },
  silver: {
    label: "Silver",
    icon: Award,
    className: "bg-gradient-to-r from-slate-400 to-slate-300 text-slate-900 border-slate-300",
    description: "Established creator",
    minVolume: "$50K",
    revenueShare: "1.5%"
  },
  gold: {
    label: "Gold",
    icon: Star,
    className: "bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-900 border-yellow-400",
    description: "Top performer",
    minVolume: "$250K",
    revenueShare: "2%"
  },
  platinum: {
    label: "Platinum",
    icon: Crown,
    className: "bg-gradient-to-r from-slate-300 to-slate-200 text-slate-800 border-slate-200",
    description: "Elite creator",
    minVolume: "$1M",
    revenueShare: "2.5%"
  },
  diamond: {
    label: "Diamond",
    icon: Gem,
    className: "bg-gradient-to-r from-cyan-400 to-blue-400 text-blue-900 border-cyan-300",
    description: "Legendary status",
    minVolume: "$5M",
    revenueShare: "3%"
  }
};

export function CreatorTierBadge({
  tier,
  showLabel = true,
  size = "md",
  showTooltip = true
}: CreatorTierBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "h-4 px-1.5 text-[10px] gap-0.5",
    md: "h-5 px-2 text-xs gap-1",
    lg: "h-6 px-2.5 text-sm gap-1.5"
  };

  const iconSizes = {
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-3.5 w-3.5"
  };

  const badge = (
    <Badge 
      className={`${config.className} ${sizeClasses[size]} font-bold border`}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="font-bold">{config.label} Creator</span>
            </div>
            <p className="text-xs text-muted-foreground">{config.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border">
              <div>
                <span className="text-muted-foreground">Min Volume:</span>
                <span className="ml-1 font-medium">{config.minVolume}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Revenue Share:</span>
                <span className="ml-1 font-medium text-primary">{config.revenueShare}</span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Progress towards next tier
export function CreatorTierProgress({
  currentTier,
  currentVolume,
  className = ""
}: {
  currentTier: CreatorTier;
  currentVolume: number;
  className?: string;
}) {
  const tiers: CreatorTier[] = ["bronze", "silver", "gold", "platinum", "diamond"];
  const currentIndex = tiers.indexOf(currentTier);
  const nextTier = currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;

  if (!nextTier) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <CreatorTierBadge tier={currentTier} size="sm" />
        <span className="text-xs text-muted-foreground">Max tier reached!</span>
      </div>
    );
  }

  const thresholds: Record<CreatorTier, number> = {
    bronze: 0,
    silver: 50000,
    gold: 250000,
    platinum: 1000000,
    diamond: 5000000
  };

  const currentThreshold = thresholds[currentTier];
  const nextThreshold = thresholds[nextTier];
  const progress = ((currentVolume - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <CreatorTierBadge tier={currentTier} size="sm" />
        <CreatorTierBadge tier={nextTier} size="sm" showLabel={false} />
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            nextTier === "gold" 
              ? "bg-gradient-to-r from-yellow-500 to-amber-400"
              : nextTier === "platinum"
                ? "bg-gradient-to-r from-slate-400 to-slate-300"
                : nextTier === "diamond"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                  : "bg-primary"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${currentVolume.toLocaleString()}</span>
        <span>${nextThreshold.toLocaleString()} to {tierConfig[nextTier].label}</span>
      </div>
    </div>
  );
}
