import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Users, DollarSign, TrendingUp } from "lucide-react";
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
    totalEarnings: 1847.50,
    pendingEarnings: 234.20,
    thisMonth: 412.30,
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base sm:text-lg font-semibold">Refer a Friend</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* Commission Info */}
          <div className="text-center py-2 px-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground">Earn</p>
            <p className="text-xl font-bold text-primary">10% Commission</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">for first 30 days per referral</p>
          </div>

          {/* Referral Code & Link */}
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
              <div className="flex-1 px-2.5 py-2 rounded-lg bg-secondary text-[10px] text-muted-foreground truncate">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <Users className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-bold">{stats.totalReferrals}</p>
              <p className="text-[9px] text-muted-foreground">Referrals</p>
            </div>
            
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <TrendingUp className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-bold">${stats.thisMonth}</p>
              <p className="text-[9px] text-muted-foreground">This Month</p>
            </div>
            
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <DollarSign className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-bold text-primary">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground">+${stats.pendingEarnings} pending</p>
            </div>
          </div>

          {/* How it works */}
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed pt-1 border-t border-border">
            Share your code with friends. When they sign up and trade, you earn 10% of platform fees from their activity for 30 days.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
