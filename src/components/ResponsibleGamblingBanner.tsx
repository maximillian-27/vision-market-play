import { useState, useEffect } from "react";
import { Clock, AlertTriangle, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ResponsibleGamblingBannerProps {
  sessionStartTime: Date;
  dailyLimit?: number;
  dailySpent?: number;
  onSetLimits?: () => void;
  onTakeBreak?: () => void;
}

export function ResponsibleGamblingBanner({
  sessionStartTime,
  dailyLimit = 500,
  dailySpent = 0,
  onSetLimits,
  onTakeBreak
}: ResponsibleGamblingBannerProps) {
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Update session duration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - sessionStartTime.getTime()) / 60000);
      setSessionDuration(duration);

      // Show reality check every 60 minutes
      if (duration > 0 && duration % 60 === 0) {
        setShowRealityCheck(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Check spending limit
  useEffect(() => {
    if (dailySpent >= dailyLimit * 0.8) {
      setShowLimitWarning(true);
    }
  }, [dailySpent, dailyLimit]);

  const limitPercentage = (dailySpent / dailyLimit) * 100;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  };

  if (dismissed) return null;

  return (
    <>
      {/* Compact info bar */}
      <div className="bg-muted/50 border-b border-border px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Session: {formatDuration(sessionDuration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Daily limit:</span>
              <div className="flex items-center gap-1.5">
                <Progress 
                  value={limitPercentage} 
                  className="w-16 h-1.5"
                />
                <span className={`font-medium ${limitPercentage >= 80 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  ${dailySpent}/${dailyLimit}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-[10px] text-muted-foreground"
              onClick={onSetLimits}
            >
              <Shield className="h-3 w-3 mr-1" />
              Set Limits
            </Button>
            <button 
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reality Check Dialog */}
      <Dialog open={showRealityCheck} onOpenChange={setShowRealityCheck}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Reality Check
            </DialogTitle>
            <DialogDescription>
              You've been playing for {formatDuration(sessionDuration)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-xl bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Session duration</span>
                <span className="font-semibold">{formatDuration(sessionDuration)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount wagered today</span>
                <span className="font-semibold">${dailySpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining daily limit</span>
                <span className="font-semibold">${(dailyLimit - dailySpent).toFixed(2)}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Remember to gamble responsibly. Take regular breaks and never bet more than you can afford to lose.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onTakeBreak}>
              Take a Break
            </Button>
            <Button className="flex-1" onClick={() => setShowRealityCheck(false)}>
              Continue Playing
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Limit Warning Dialog */}
      <Dialog open={showLimitWarning} onOpenChange={setShowLimitWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <AlertTriangle className="h-5 w-5" />
              Approaching Daily Limit
            </DialogTitle>
            <DialogDescription>
              You've used {Math.round(limitPercentage)}% of your daily betting limit
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily limit</span>
                <span className="font-semibold">${dailyLimit.toFixed(2)}</span>
              </div>
              <Progress value={limitPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Spent: ${dailySpent.toFixed(2)}</span>
                <span>Remaining: ${(dailyLimit - dailySpent).toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent">
              Consider stopping for today or adjusting your betting strategy.
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onSetLimits}>
              Adjust Limits
            </Button>
            <Button className="flex-1" onClick={() => setShowLimitWarning(false)}>
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
