import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExportDropdown } from "./ExportDropdown";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Star, UserPlus, ChevronLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

// --- Segment definitions ---

export interface SegmentDef {
  id: string;
  name: string;
  description: string;
  icon: typeof Users;
  count: number;
  entity: "user" | "creator" | "affiliate";
  custom?: boolean;
}

export const userSegments: SegmentDef[] = [
  { id: "whales", name: "Whales", description: "Lifetime volume > $100K", icon: Users, count: 142, entity: "user" },
  { id: "high-value", name: "High Value", description: "Lifetime volume > $10K", icon: Users, count: 1240, entity: "user" },
  { id: "active", name: "Active Users", description: "Activity in last 30 days", icon: Users, count: 45200, entity: "user" },
  { id: "inactive", name: "Inactive Users", description: "No activity for 30+ days", icon: Users, count: 35300, entity: "user" },
  { id: "new", name: "New Users", description: "Joined in last 7 days", icon: Users, count: 347, entity: "user" },
  { id: "unverified", name: "Unverified Users", description: "KYC not completed", icon: Users, count: 8920, entity: "user" },
];

export const creatorSegments: SegmentDef[] = [
  { id: "top-creators", name: "Top Creators", description: "Highest trading volume generated", icon: Star, count: 12, entity: "creator" },
  { id: "active-creators", name: "Active Creators", description: "Markets created in last 30 days", icon: Star, count: 34, entity: "creator" },
  { id: "inactive-creators", name: "Inactive Creators", description: "No markets in 30+ days", icon: Star, count: 18, entity: "creator" },
  { id: "high-earnings-creators", name: "High Earnings Creators", description: "Earnings > $5K lifetime", icon: Star, count: 8, entity: "creator" },
];

export const affiliateSegments: SegmentDef[] = [
  { id: "top-affiliates", name: "Top Affiliates", description: "Highest referral volume", icon: UserPlus, count: 6, entity: "affiliate" },
  { id: "active-affiliates", name: "Active Affiliates", description: "Referred users active in last 30 days", icon: UserPlus, count: 15, entity: "affiliate" },
  { id: "inactive-affiliates", name: "Inactive Affiliates", description: "No referral activity for 30+ days", icon: UserPlus, count: 9, entity: "affiliate" },
  { id: "high-earnings-affiliates", name: "High Earnings Affiliates", description: "Earnings > $2K lifetime", icon: UserPlus, count: 4, entity: "affiliate" },
];

// --- Mock segment data generators ---
const userSegmentData = [
  { name: "Alice Johnson", wallet: "0x2c8...d5e9", joined: "2024-01-10", lifetimeVolume: 312000, trades: 2100, status: "Active" },
  { name: "Jane Smith", wallet: "0x3b1...c8d2", joined: "2024-06-22", lifetimeVolume: 128000, trades: 890, status: "Active" },
  { name: "Diana Prince", wallet: "0x8d7...c2a6", joined: "2024-04-18", lifetimeVolume: 67000, trades: 456, status: "Active" },
  { name: "John Doe", wallet: "0x7a2...f3e1", joined: "2024-03-15", lifetimeVolume: 45200, trades: 234, status: "Active" },
  { name: "Charlie Brown", wallet: "0x6e3...b1f4", joined: "2024-11-05", lifetimeVolume: 8900, trades: 67, status: "Active" },
];

const creatorSegmentData = [
  { name: "SportsAnalyst", markets: 15, volume: "$1.2M", earnings: "$7,200", status: "Active" },
  { name: "CryptoGuru", markets: 12, volume: "$890K", earnings: "$5,340", status: "Active" },
  { name: "TechOracle", markets: 8, volume: "$456K", earnings: "$2,736", status: "Active" },
  { name: "AllRounder", markets: 6, volume: "$345K", earnings: "$4,100", status: "Active" },
];

const affiliateSegmentData = [
  { name: "PromoQueen", referred: 312, volume: "$567K", earnings: "$3,402", status: "Active" },
  { name: "ReferKing", referred: 145, volume: "$234K", earnings: "$1,404", status: "Active" },
  { name: "GrowthHacker", referred: 89, volume: "$156K", earnings: "$936", status: "Active" },
  { name: "AllRounder", referred: 78, volume: "$120K", earnings: "$720", status: "Active" },
];

// --- Custom Segment Dialog ---
interface CustomSegmentDialogProps {
  entity: "user" | "creator" | "affiliate";
  onSave: (segment: SegmentDef) => void;
  editSegment?: SegmentDef | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomSegmentDialog = ({ entity, onSave, editSegment, open, onOpenChange }: CustomSegmentDialogProps) => {
  const [name, setName] = useState(editSegment?.name || "");
  const [volumeThreshold, setVolumeThreshold] = useState("10000");
  const [activityWindow, setActivityWindow] = useState("30");
  const [role, setRole] = useState(entity);

  const handleSave = () => {
    if (!name.trim()) { toast.error("Segment name required"); return; }
    onSave({
      id: editSegment?.id || `custom-${Date.now()}`,
      name,
      description: `Volume > $${Number(volumeThreshold).toLocaleString()}, ${activityWindow}d window`,
      icon: entity === "creator" ? Star : entity === "affiliate" ? UserPlus : Users,
      count: Math.floor(Math.random() * 500) + 10,
      entity,
      custom: true,
    });
    onOpenChange(false);
    setName(""); setVolumeThreshold("10000"); setActivityWindow("30");
    toast.success(editSegment ? "Segment updated" : "Custom segment created");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">{editSegment ? "Edit" : "Create"} Custom Segment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label className="text-xs">Segment Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. High Rollers" className="h-9 mt-1" />
          </div>
          <div>
            <Label className="text-xs">Volume Threshold ($)</Label>
            <Input type="number" value={volumeThreshold} onChange={e => setVolumeThreshold(e.target.value)} className="h-9 mt-1" />
          </div>
          <div>
            <Label className="text-xs">Activity Window</Label>
            <Select value={activityWindow} onValueChange={setActivityWindow}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Role</Label>
            <Select value={role} onValueChange={v => setRole(v as any)}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="affiliate">Affiliate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button size="sm" onClick={handleSave}>{editSegment ? "Update" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- Main Segments Panel ---
interface SegmentsPanelProps {
  builtInSegments: SegmentDef[];
  entity: "user" | "creator" | "affiliate";
}

export const SegmentsPanel = ({ builtInSegments, entity }: SegmentsPanelProps) => {
  const [activeSegment, setActiveSegment] = useState<SegmentDef | null>(null);
  const [customSegments, setCustomSegments] = useState<SegmentDef[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<SegmentDef | null>(null);

  const allSegments = [...builtInSegments, ...customSegments];

  const handleSaveCustom = (segment: SegmentDef) => {
    setCustomSegments(prev => {
      const exists = prev.find(s => s.id === segment.id);
      return exists ? prev.map(s => s.id === segment.id ? segment : s) : [...prev, segment];
    });
  };

  const handleDeleteCustom = (id: string) => {
    setCustomSegments(prev => prev.filter(s => s.id !== id));
    toast.success("Segment deleted");
  };

  const getSegmentTableData = () => {
    if (entity === "user") return userSegmentData;
    if (entity === "creator") return creatorSegmentData;
    return affiliateSegmentData;
  };

  // Segment detail view
  if (activeSegment) {
    const data = getSegmentTableData();
    const headers = Object.keys(data[0]);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs" onClick={() => setActiveSegment(null)}>
            <ChevronLeft className="h-3.5 w-3.5" /> Back to Segments
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">{activeSegment.name}</h3>
            <p className="text-xs text-muted-foreground">{activeSegment.description} — {activeSegment.count.toLocaleString()} matches</p>
          </div>
          <ExportDropdown data={data} filename={`segment-${activeSegment.id}`} pdfTitle={`Segment: ${activeSegment.name}`} />
        </div>
        <Card className="border-border/40">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                  {headers.map(h => <th key={h} className="p-3 font-medium capitalize">{h.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    {headers.map(h => (
                      <td key={h} className={`p-3 text-sm ${h === "status" ? "" : h === "name" ? "font-medium" : h.includes("olume") || h.includes("arning") ? "font-medium" : ""}`}>
                        {h === "status" ? <Badge variant="default" className="text-xs">{String((row as any)[h])}</Badge> :
                         h === "lifetimeVolume" ? `$${Number((row as any)[h]).toLocaleString()}` :
                         String((row as any)[h])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // Segments list view
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{allSegments.length} segments available</p>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => { setEditingSegment(null); setDialogOpen(true); }}>
          <Plus className="h-3.5 w-3.5" /> Custom Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allSegments.map((seg) => (
          <Card
            key={seg.id}
            className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors group"
            onClick={() => setActiveSegment(seg)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <seg.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{seg.name}</p>
                  {seg.custom && <Badge variant="outline" className="text-[10px]">Custom</Badge>}
                </div>
                {seg.custom && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); setEditingSegment(seg); setDialogOpen(true); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); handleDeleteCustom(seg.id); }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{seg.description}</p>
              <p className="text-lg font-bold">{seg.count.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <CustomSegmentDialog
        entity={entity}
        onSave={handleSaveCustom}
        editSegment={editingSegment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};
