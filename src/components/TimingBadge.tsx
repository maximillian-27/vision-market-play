import { Bird, Clock, Flame } from "lucide-react";

type TimingPhase = "early" | "good" | "late";

function parseEndsIn(endsIn: string): TimingPhase {
  const lower = endsIn.toLowerCase();
  const days = lower.match(/(\d+)\s*d/);
  const hours = lower.match(/(\d+)\s*h/);
  const mins = lower.match(/(\d+)\s*m/);

  const totalHours =
    (days ? parseInt(days[1]) * 24 : 0) +
    (hours ? parseInt(hours[1]) : 0) +
    (mins ? parseInt(mins[1]) / 60 : 0);

  if (totalHours > 72) return "early";
  if (totalHours > 24) return "good";
  return "late";
}

const config: Record<TimingPhase, { label: string; className: string; Icon: typeof Bird }> = {
  early: { label: "Early Bird", className: "text-success", Icon: Bird },
  good:  { label: "Good Timing", className: "text-amber-500", Icon: Clock },
  late:  { label: "Late Entry", className: "text-destructive", Icon: Flame },
};

interface TimingBadgeProps {
  endsIn: string;
  className?: string;
}

export function TimingBadge({ endsIn, className = "" }: TimingBadgeProps) {
  const phase = parseEndsIn(endsIn);
  const { label, className: color, Icon } = config[phase];

  return (
    <span className={`inline-flex items-center gap-0.5 text-[9px] font-semibold ${color} ${className}`}>
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}
