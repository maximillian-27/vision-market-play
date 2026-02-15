import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Flame, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type OddsFormat = "decimal" | "fractional" | "american" | "probability";

interface OddsDisplayProps {
  probability: number; // 0-100
  previousProbability?: number;
  format?: OddsFormat;
  size?: "sm" | "md" | "lg";
  showMovement?: boolean;
  showLabel?: boolean;
  isHot?: boolean;
  isLive?: boolean;
  className?: string;
}

export function OddsDisplay({
  probability,
  previousProbability,
  format = "probability",
  size = "md",
  showMovement = true,
  showLabel = false,
  isHot = false,
  isLive = false,
  className = ""
}: OddsDisplayProps) {
  // Convert probability to different formats
  const formatOdds = (prob: number): string => {
    const decimal = 100 / prob;
    
    switch (format) {
      case "decimal":
        return decimal.toFixed(2);
      case "fractional": {
        const numerator = Math.round((decimal - 1) * 100);
        const denominator = 100;
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(numerator, denominator);
        if (numerator / divisor === denominator / divisor) return "1/1";
        return `${numerator / divisor}/${denominator / divisor}`;
      }
      case "american": {
        if (decimal >= 2) {
          return `+${Math.round((decimal - 1) * 100)}`;
        } else {
          return `${Math.round(-100 / (decimal - 1))}`;
        }
      }
      case "probability":
      default:
        return `${prob}%`;
    }
  };

  const movement = previousProbability !== undefined 
    ? probability - previousProbability 
    : 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };

  const MovementIcon = movement > 0 
    ? TrendingUp 
    : movement < 0 
      ? TrendingDown 
      : Minus;

  const movementColor = movement > 0 
    ? "text-bet" 
    : movement < 0 
      ? "text-against" 
      : "text-muted-foreground";

  return (
    <TooltipProvider>
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {/* Hot/Live indicators */}
        {isLive && (
          <Badge className="badge-live gap-0.5 px-1.5 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            LIVE
          </Badge>
        )}

        {/* Odds value */}
        <span className={`font-bold ${sizeClasses[size]}`}>
          {formatOdds(probability)}
        </span>

        {/* Label */}
        {showLabel && format !== "probability" && (
          <span className="text-xs text-muted-foreground uppercase">
            {format}
          </span>
        )}

        {/* Movement indicator */}
        {showMovement && movement !== 0 && (
          <Tooltip>
            <TooltipTrigger>
              <span className={`inline-flex items-center gap-0.5 text-xs ${movementColor}`}>
                <MovementIcon className="h-3 w-3" />
                <span>{Math.abs(movement).toFixed(1)}</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {movement > 0 ? "Up" : "Down"} {Math.abs(movement).toFixed(1)}% in last hour
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

// Compact odds pill for market cards
export function OddsPill({
  probability,
  outcome,
  isPositive = true,
  size = "sm",
  onClick
}: {
  probability: number;
  outcome: string;
  isPositive?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-lg font-bold transition-all active:scale-[0.97]
        ${sizeClasses[size]}
        ${isPositive 
          ? "bg-bet/15 text-bet border border-bet/30 hover:bg-bet hover:text-bet-foreground hover:border-bet" 
          : "bg-against/15 text-against border border-against/30 hover:bg-against hover:text-against-foreground hover:border-against"
        }
      `}
    >
      <span>{outcome}</span>
      <span className="opacity-80">{probability}%</span>
    </button>
  );
}

// Odds movement sparkline
export function OddsSparkline({
  data,
  width = 60,
  height = 20,
  className = ""
}: {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const isUp = data[data.length - 1] > data[0];

  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "hsl(var(--bet))" : "hsl(var(--against))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
