import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";
import { Shield, Target, Trophy } from "lucide-react";

export function GradientDivider() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div
        className="w-full rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{
          background: "linear-gradient(90deg, hsl(145 72% 44%) 0%, hsl(217 85% 55%) 100%)",
        }}
      >
        <p className="text-white font-display font-bold text-xs sm:text-sm leading-snug text-center sm:text-left">
          Polly. First creator led, community owned prediction market platform
        </p>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-white/90 text-[10px] font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Shield className="h-2.5 w-2.5" />
              Safe
            </span>
            <span className="inline-flex items-center gap-1 text-white/90 text-[10px] font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Target className="h-2.5 w-2.5" />
              Relevant
            </span>
            <span className="inline-flex items-center gap-1 text-white/90 text-[10px] font-semibold bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Trophy className="h-2.5 w-2.5" />
              The best.
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm font-semibold text-[10px] h-6 px-2.5"
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
