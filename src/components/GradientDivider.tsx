import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";
import { Shield, Target, Trophy } from "lucide-react";

export function GradientDivider() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div
        className="w-full rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{
          background: "linear-gradient(90deg, hsl(145 72% 44%) 0%, hsl(217 85% 55%) 100%)",
        }}
      >
        {/* Left text */}
        <p className="text-white font-display font-bold text-sm sm:text-base leading-snug text-center sm:text-left">
          Polly. First creator led, community owned prediction market platform
        </p>

        {/* Right side: labels + button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-white/90 text-xs font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Shield className="h-3 w-3" />
              Safe
            </span>
            <span className="inline-flex items-center gap-1 text-white/90 text-xs font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Target className="h-3 w-3" />
              Relevant
            </span>
            <span className="inline-flex items-center gap-1 text-white/90 text-xs font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Trophy className="h-3 w-3" />
              The best.
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm font-semibold text-xs"
            onClick={() => setShowHowItWorks(true)}
          >
            How it works?
          </Button>
        </div>
      </div>

      <HowItWorksDialog open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </>
  );
}
