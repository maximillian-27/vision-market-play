import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface AdminFiltersProps {
  onExport?: () => void;
  showGeo?: boolean;
  showCategory?: boolean;
  showCreator?: boolean;
  showAffiliate?: boolean;
  exportLabel?: string;
}

const timePeriods = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "1y", label: "1y" },
  { value: "all", label: "All Time" },
];

export const AdminFilters = ({
  onExport,
  showGeo = true,
  showCategory = true,
  showCreator = false,
  showAffiliate = false,
  exportLabel = "Export CSV",
}: AdminFiltersProps) => {
  const [period, setPeriod] = useState("30d");
  const [geo, setGeo] = useState("all");
  const [category, setCategory] = useState("all");
  const [hasFilters, setHasFilters] = useState(false);

  const resetFilters = () => {
    setPeriod("30d");
    setGeo("all");
    setCategory("all");
    setHasFilters(false);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Date range pills */}
      <div className="flex items-center gap-1">
        {timePeriods.map((p) => (
          <Button
            key={p.value}
            variant={period === p.value ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs px-3"
            onClick={() => { setPeriod(p.value); setHasFilters(true); }}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {showGeo && (
        <Select value={geo} onValueChange={(v) => { setGeo(v); setHasFilters(true); }}>
          <SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="Geo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      )}

      {showCategory && (
        <Select value={category} onValueChange={(v) => { setCategory(v); setHasFilters(true); }}>
          <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="politics">Politics</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
      )}

      {showCreator && (
        <Input placeholder="Creator..." className="w-28 h-8 text-xs" />
      )}

      {showAffiliate && (
        <Input placeholder="Affiliate..." className="w-28 h-8 text-xs" />
      )}

      {hasFilters && (
        <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      )}

      <div className="ml-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={() => { onExport?.(); toast.success("Data exported as CSV"); }}
        >
          <Download className="h-3.5 w-3.5" /> {exportLabel}
        </Button>
      </div>
    </div>
  );
};
