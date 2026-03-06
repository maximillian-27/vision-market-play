import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Image, Upload } from "lucide-react";
import { toast } from "sonner";

const existingMarkets = [
  { id: "1", title: "Will Bitcoin reach $100K by end of 2025?" },
  { id: "2", title: "Will AI replace most software jobs by 2030?" },
  { id: "3", title: "Super Bowl 2025 Champion" },
  { id: "4", title: "Will SpaceX land on Mars by 2026?" },
  { id: "5", title: "Will Ethereum flip Bitcoin?" },
];

export const AdminFeaturedMarkets = () => {
  const [bannerMode, setBannerMode] = useState<"market" | "custom">("market");
  const [bannerMarket, setBannerMarket] = useState("1");
  const [slots, setSlots] = useState(["1", "3", "5", ""]);

  const updateSlot = (idx: number, value: string) => {
    const next = [...slots];
    next[idx] = value;
    setSlots(next);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Main Banner */}
      <Card className="border-border/40">
        <CardHeader className="pb-3"><CardTitle className="text-base">Main Banner (Hero Section)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label className="text-sm">Mode</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Featured Market</span>
              <Switch checked={bannerMode === "custom"} onCheckedChange={(v) => setBannerMode(v ? "custom" : "market")} />
              <span className="text-sm text-muted-foreground">Custom Graphic</span>
            </div>
          </div>

          {bannerMode === "market" ? (
            <div>
              <Label className="text-sm">Select Market</Label>
              <Select value={bannerMarket} onValueChange={setBannerMarket}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {existingMarkets.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Upload Image (1200×400)</Label>
                <div className="mt-1 border-2 border-dashed border-border/60 rounded-lg p-8 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors" onClick={() => toast("Image upload dialog")}>
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Click to upload or drag & drop</span>
                </div>
              </div>
              <div><Label className="text-sm">Title</Label><Input placeholder="Banner title..." className="mt-1" /></div>
              <div><Label className="text-sm">CTA Link</Label><Input placeholder="https://..." className="mt-1" /></div>
            </div>
          )}

          <Button onClick={() => toast.success("Banner updated")} className="w-full">Save Banner</Button>
        </CardContent>
      </Card>

      {/* Highlighted Slots */}
      <Card className="border-border/40">
        <CardHeader className="pb-3"><CardTitle className="text-base">Highlighted Markets (4 Slots)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {slots.map((slot, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16">Slot {idx + 1}</span>
              <Select value={slot} onValueChange={(v) => updateSlot(idx, v)}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Select a market..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— Empty —</SelectItem>
                  {existingMarkets.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button onClick={() => toast.success("Highlighted markets saved")} className="w-full">Save Highlights</Button>
        </CardContent>
      </Card>
    </div>
  );
};
