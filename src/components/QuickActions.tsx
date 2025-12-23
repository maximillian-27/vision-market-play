import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Plus, Settings, Share2, UserPlus, UserCheck } from "lucide-react";

interface QuickActionsProps {
  type: "own-profile" | "other-profile" | "creator-profile";
  isFollowing?: boolean;
  onFollow?: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onSettings?: () => void;
  onShare?: () => void;
  onCreateMarket?: () => void;
}

export function QuickActions({
  type,
  isFollowing = false,
  onFollow,
  onDeposit,
  onWithdraw,
  onSettings,
  onShare,
  onCreateMarket,
}: QuickActionsProps) {
  if (type === "own-profile") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={onDeposit} className="gap-1.5">
          <ArrowUpRight className="h-4 w-4" />
          Deposit
        </Button>
        <Button size="sm" variant="outline" onClick={onWithdraw} className="gap-1.5">
          <ArrowDownLeft className="h-4 w-4" />
          Withdraw
        </Button>
        <Button size="sm" variant="ghost" onClick={onSettings}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (type === "creator-profile") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant={isFollowing ? "outline" : "default"}
          onClick={onFollow}
          className="gap-1.5"
        >
          {isFollowing ? (
            <>
              <UserCheck className="h-4 w-4" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Follow
            </>
          )}
        </Button>
        <Button size="sm" variant="ghost" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="sm" 
        variant={isFollowing ? "outline" : "default"}
        onClick={onFollow}
        className="gap-1.5"
      >
        {isFollowing ? (
          <>
            <UserCheck className="h-4 w-4" />
            Following
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Follow
          </>
        )}
      </Button>
      <Button size="sm" variant="ghost" onClick={onShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
