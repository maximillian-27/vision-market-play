import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AdminFilters } from "./AdminFilters";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { name: "Sports", markets: 234, active: 198, volume: 1200000, enabled: true },
  { name: "Crypto", markets: 189, active: 165, volume: 3400000, enabled: true },
  { name: "Politics", markets: 78, active: 52, volume: 890000, enabled: true },
  { name: "Tech", markets: 156, active: 134, volume: 670000, enabled: true },
  { name: "Entertainment", markets: 45, active: 38, volume: 120000, enabled: true },
  { name: "Science", markets: 23, active: 12, volume: 56000, enabled: false },
];

export const AdminCategories = () => {
  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{categories.length} categories</p>
        <Button size="sm" className="gap-1.5" onClick={() => toast("Category creation form")}><Plus className="h-3.5 w-3.5" /> Add Category</Button>
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Total Markets</th>
                <th className="p-3 font-medium">Active</th>
                <th className="p-3 font-medium">Volume</th>
                <th className="p-3 font-medium">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{c.name}</td>
                  <td className="p-3 text-sm">{c.markets}</td>
                  <td className="p-3 text-sm">{c.active}</td>
                  <td className="p-3 text-sm font-medium text-primary">${(c.volume / 1e6).toFixed(1)}M</td>
                  <td className="p-3">
                    <Switch defaultChecked={c.enabled} onCheckedChange={(v) => toast.success(`${c.name} ${v ? 'enabled' : 'disabled'}`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
