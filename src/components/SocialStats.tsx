import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SocialStatsProps {
  followers: string | number;
  following: string | number;
  userId?: string;
  className?: string;
}

export function SocialStats({ followers, following, userId, className = "" }: SocialStatsProps) {
  const navigate = useNavigate();

  const formatNumber = (num: string | number): string => {
    if (typeof num === "string") return num;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button 
        className="flex items-center gap-1.5 hover:underline transition-colors"
        onClick={() => userId && navigate(`/profile/${userId}/followers`)}
      >
        <span className="font-semibold">{formatNumber(followers)}</span>
        <span className="text-muted-foreground text-sm">Followers</span>
      </button>
      <button 
        className="flex items-center gap-1.5 hover:underline transition-colors"
        onClick={() => userId && navigate(`/profile/${userId}/following`)}
      >
        <span className="font-semibold">{formatNumber(following)}</span>
        <span className="text-muted-foreground text-sm">Following</span>
      </button>
    </div>
  );
}
