import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface AffiliateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AffiliateDialog({ open, onOpenChange }: AffiliateDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const affiliateCode = "POLLGY-X7K9M2";
  const referralLink = `https://pollgy.com/ref/${affiliateCode}`;
  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 1847.50,
    pendingEarnings: 234.20,
    thisMonth: 412.30,
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 [&>button]:hidden">
        {/* Header with back arrow */}
        <div className="flex items-center gap-3 p-4 border-b border-border/40">
          <button
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-base font-semibold">Refer a Friend</h2>
        </div>

        <div className="p-5 space-y-5">
          {/* Hero banner */}
          <div className="text-center py-4 rounded-xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/10">
            <p className="text-3xl font-bold text-primary">10%</p>
            <p className="text-sm text-muted-foreground mt-0.5">commission for 12 months</p>
          </div>

          {/* Code + Link */}
          <div className="space-y-3">
            <div
              onClick={() => copyToClipboard(affiliateCode, "code")}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 border border-border/40 cursor-pointer hover:border-border/60 transition-colors"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Your code</p>
                <p className="font-mono font-bold text-sm tracking-wide">{affiliateCode}</p>
              </div>
              {copiedField === "code" ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <div
              onClick={() => copyToClipboard(referralLink, "link")}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 border border-border/40 cursor-pointer hover:border-border/60 transition-colors"
            >
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Referral link</p>
                <p className="text-xs text-foreground/70 truncate">{referralLink}</p>
              </div>
              {copiedField === "link" ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Stats - simple 2-col */}
          <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-border/40 bg-border/40">
            <div className="bg-card p-3.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Referrals</p>
              <p className="text-xl font-bold mt-1">{stats.totalReferrals}</p>
              <p className="text-[10px] text-muted-foreground">{stats.activeReferrals} active</p>
            </div>
            <div className="bg-card p-3.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total earned</p>
              <p className="text-xl font-bold text-success mt-1">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">${stats.pendingEarnings} pending</p>
            </div>
            <div className="bg-card p-3.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">This month</p>
              <p className="text-xl font-bold mt-1">${stats.thisMonth.toLocaleString()}</p>
            </div>
            <div className="bg-card p-3.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Commission</p>
              <p className="text-xl font-bold mt-1">10%</p>
              <p className="text-[10px] text-muted-foreground">for 12 months</p>
            </div>
          </div>

          {/* Share CTA */}
          <Button
            className="w-full gap-2"
            onClick={() => {
              copyToClipboard(referralLink, "link");
            }}
          >
            <Share2 className="h-4 w-4" />
            Share your link
          </Button>

          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Earn 10% of platform fees from every friend you refer, for 12 months after they join.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
