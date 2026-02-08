import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";

export function GradientDivider() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div
        className="w-full rounded-2xl px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{
          background: "linear-gradient(90deg, hsl(145 72% 44%) 0%, hsl(217 85% 55%) 100%)",
        }}
      >
        {/* Left tagline */}
        <p className="text-white font-display font-bold text-sm leading-snug text-center sm:text-left">
          Pollgy.{" "}
          <span className="text-white/90">First</span> creator led,{" "}
          <span className="text-white/90">community owned</span> prediction market platform
        </p>

        {/* Right side: labels separated by dividers + button */}
        <div className="flex items-center gap-0 flex-shrink-0">
          <span className="text-white font-bold text-sm px-4">Safe</span>
          <span className="w-px h-4 bg-white/30" />
          <span className="text-white font-bold text-sm px-4">Relevant</span>
          <span className="w-px h-4 bg-white/30" />
          <span className="text-white font-bold text-sm px-4">The best.</span>

          <Button
            variant="outline"
            size="sm"
            className="ml-3 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm font-semibold text-xs h-8 rounded-full px-4"
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
