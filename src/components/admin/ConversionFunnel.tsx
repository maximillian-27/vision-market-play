import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ChevronDown, Filter } from "lucide-react";

interface FunnelStage {
  label: string;
  count: number;
  users: { name: string; email: string; date: string }[];
}

const funnelData: FunnelStage[] = [
  {
    label: "Visitors",
    count: 10000,
    users: [
      { name: "Anonymous", email: "—", date: "2026-03-06" },
      { name: "Anonymous", email: "—", date: "2026-03-05" },
    ],
  },
  {
    label: "Signups",
    count: 2500,
    users: [
      { name: "Alice Chen", email: "alice@example.com", date: "2026-03-05" },
      { name: "Bob Russo", email: "bob@example.com", date: "2026-03-04" },
      { name: "Chloe Diaz", email: "chloe@example.com", date: "2026-03-04" },
    ],
  },
  {
    label: "First Deposit",
    count: 1200,
    users: [
      { name: "Alice Chen", email: "alice@example.com", date: "2026-03-05" },
      { name: "Chloe Diaz", email: "chloe@example.com", date: "2026-03-03" },
    ],
  },
  {
    label: "First Trade",
    count: 900,
    users: [
      { name: "Alice Chen", email: "alice@example.com", date: "2026-03-05" },
    ],
  },
  {
    label: "Active Traders (30d)",
    count: 700,
    users: [
      { name: "Alice Chen", email: "alice@example.com", date: "2026-03-06" },
    ],
  },
];

const getConversionColor = (pct: number) => {
  if (pct >= 70) return "text-success";
  if (pct >= 40) return "text-warning";
  return "text-destructive";
};

const getConversionBg = (pct: number) => {
  if (pct >= 70) return "bg-success/10";
  if (pct >= 40) return "bg-warning/10";
  return "bg-destructive/10";
};

const getBarColor = (pct: number) => {
  if (pct >= 70) return "bg-success";
  if (pct >= 40) return "bg-warning";
  return "bg-destructive";
};

export const ConversionFunnel = () => {
  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);

  const maxCount = funnelData[0].count;

  return (
    <>
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              Conversion Funnel
            </CardTitle>
            <Badge variant="outline" className="text-[10px] font-normal">
              Overall: {((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {funnelData.map((stage, i) => {
              const prevCount = i > 0 ? funnelData[i - 1].count : stage.count;
              const conversionPct = i === 0 ? 100 : (stage.count / prevCount) * 100;
              const barWidth = (stage.count / maxCount) * 100;

              return (
                <div key={stage.label}>
                  {/* Drop-off indicator between steps */}
                  {i > 0 && (
                    <div className="flex items-center gap-2 py-1 pl-2">
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      <span className={`text-xs font-medium ${getConversionColor(conversionPct)}`}>
                        {conversionPct.toFixed(0)}% conversion
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {(prevCount - stage.count).toLocaleString()} dropped
                      </span>
                    </div>
                  )}

                  {/* Stage row */}
                  <button
                    onClick={() => setSelectedStage(stage)}
                    className="w-full group relative rounded-lg border border-border/30 hover:border-border/60 bg-card hover:bg-muted/20 transition-all p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stage.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tabular-nums">
                          {stage.count.toLocaleString()}
                        </span>
                        {i > 0 && (
                          <Badge
                            className={`text-[10px] border-0 ${getConversionBg(conversionPct)} ${getConversionColor(conversionPct)}`}
                          >
                            {conversionPct.toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Bar visualization */}
                    <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getBarColor(i === 0 ? 100 : conversionPct)}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* User list drawer */}
      <Sheet open={!!selectedStage} onOpenChange={() => setSelectedStage(null)}>
        <SheetContent className="w-[400px] sm:w-[480px] overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">
              {selectedStage?.label} — {selectedStage?.count.toLocaleString()} users
            </SheetTitle>
          </SheetHeader>
          <Separator className="mb-4" />
          <div className="space-y-0">
            {selectedStage?.users.map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-border/20 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">{user.date}</span>
              </div>
            ))}
            {(selectedStage?.users.length ?? 0) < (selectedStage?.count ?? 0) && (
              <p className="text-xs text-muted-foreground text-center pt-4">
                Showing {selectedStage?.users.length} of {selectedStage?.count.toLocaleString()} users
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
