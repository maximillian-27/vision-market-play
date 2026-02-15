export function GradientDivider() {
  return (
    <div
      className="w-full rounded-xl px-3 lg:px-4 py-1.5 lg:py-2 flex flex-col sm:flex-row items-center justify-between gap-1"
      style={{
        background: "linear-gradient(90deg, hsl(145 72% 44%) 0%, hsl(217 85% 55%) 100%)",
      }}
    >
      <p className="text-white font-bold text-[10px] sm:text-[11px] lg:text-xs leading-snug text-center sm:text-left whitespace-nowrap min-w-0">
        Pollgy. First creator led, community owned prediction market platform
      </p>

      <div className="flex items-center gap-0 flex-shrink-0">
        <span className="text-white font-bold text-[10px] sm:text-[11px] lg:text-xs px-1 lg:px-3">Safe</span>
        <span className="w-px h-3 bg-white/30" />
        <span className="text-white font-bold text-[10px] sm:text-[11px] lg:text-xs px-1 lg:px-3">Relevant</span>
        <span className="w-px h-3 bg-white/30" />
        <span className="text-white font-bold text-[10px] sm:text-[11px] lg:text-xs px-1 lg:px-3">The best.</span>
      </div>
    </div>
  );
}
