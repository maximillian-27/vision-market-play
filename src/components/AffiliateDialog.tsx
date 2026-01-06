import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Users, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

interface AffiliateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AffiliateDialog({ open, onOpenChange }: AffiliateDialogProps) {
  const [copied, setCopied] = useState(false);
  
  // Mock affiliate data
  const affiliateCode = "POLLGY-X7K9M2";
  const referralLink = `https://pollgy.com/ref/${affiliateCode}`;
  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 1847.50,
    pendingEarnings: 234.20,
    thisMonth: 412.30,
    commissionRate: 10,
    durationMonths: 12,
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md max-h-[85vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Affiliate Program</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* Commission Info - Compact */}
          <div className="text-center py-2 px-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xl font-bold text-primary">{stats.commissionRate}% for {stats.durationMonths} months</p>
          </div>

          {/* Referral Code & Link - Combined */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 px-2.5 py-2 rounded-lg bg-secondary font-mono text-xs font-semibold tracking-wide">
                {affiliateCode}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => copyToClipboard(affiliateCode, "Code")}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-2.5 py-2 rounded-lg bg-secondary text-[11px] text-muted-foreground truncate">
                {referralLink}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => copyToClipboard(referralLink, "Link")}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <Users className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm font-bold">{stats.totalReferrals}</p>
              <p className="text-[9px] text-muted-foreground">Referrals</p>
            </div>
            
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <DollarSign className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm font-bold text-primary">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground">Earned</p>
            </div>
            
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <TrendingUp className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm font-bold">${stats.thisMonth}</p>
              <p className="text-[9px] text-muted-foreground">This Mo.</p>
            </div>
            
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <Calendar className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm font-bold">${stats.pendingEarnings}</p>
              <p className="text-[9px] text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* How it works - Compact */}
          <p className="text-[10px] text-muted-foreground text-center pt-1 border-t border-border">
            Share your code • Earn {stats.commissionRate}% of fees for {stats.durationMonths} months per referral
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
