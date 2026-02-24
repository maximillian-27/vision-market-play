import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Bitcoin, Building2, ArrowLeft, Check, Copy, AlertTriangle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentMethod = "card" | "crypto" | "wire" | null;
type Step = "method" | "amount" | "crypto";

const paymentMethods = [
  {
    id: "card" as const,
    label: "Card",
    description: "Visa, Mastercard, Amex",
    icon: CreditCard,
    fee: "2.9% fee",
    time: "Instant",
  },
  {
    id: "crypto" as const,
    label: "Crypto",
    description: "BTC, ETH, USDC, USDT",
    icon: Bitcoin,
    fee: "No fee",
    time: "~10 min",
  },
  {
    id: "wire" as const,
    label: "Wire Transfer",
    description: "Bank transfer",
    icon: Building2,
    fee: "No fee",
    time: "1-3 days",
  },
];

const quickAmounts = [50, 100, 250, 500, 1000];

const networks = [
  { id: "polygon", label: "Polygon", color: "bg-violet-500" },
  { id: "ethereum", label: "Ethereum", color: "bg-blue-500" },
  { id: "bsc", label: "BNB Chain", color: "bg-yellow-500" },
  { id: "arbitrum", label: "Arbitrum", color: "bg-sky-500" },
  { id: "solana", label: "Solana", color: "bg-emerald-500" },
];

const tokens = [
  { id: "usdc", label: "USDC", symbol: "$" },
  { id: "usdt", label: "USDT", symbol: "₮" },
];

// Mock addresses per network
const walletAddresses: Record<string, string> = {
  polygon: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62",
  ethereum: "0xA1B2C3D4E5F6a7b8c9d0E1F2a3B4c5D6e7F8a9",
  bsc: "0x1234567890abcdef1234567890abcdef12345678",
  arbitrum: "0xDeadBeef0123456789abcdef0123456789abcdef",
  solana: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
};

export function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState("polygon");
  const [selectedToken, setSelectedToken] = useState("usdc");

  const currentAddress = walletAddresses[selectedNetwork];
  const currentNetwork = networks.find(n => n.id === selectedNetwork)!;
  const currentToken = tokens.find(t => t.id === selectedToken)!;

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (method === "crypto") {
      setStep("crypto");
    } else {
      setStep("amount");
    }
  };

  const handleBack = () => {
    setStep("method");
    setSelectedMethod(null);
    setSelectedAmount(null);
    setCustomAmount("");
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setStep("method");
      setSelectedMethod(null);
      setSelectedAmount(null);
      setCustomAmount("");
    }
    onOpenChange(isOpen);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentAddress);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="z-50 rounded-xl border-border/60 max-w-sm p-0 overflow-hidden">
        {step === "method" && (
          <>
            <DialogHeader className="p-5 pb-3">
              <DialogTitle className="text-lg">Deposit Funds</DialogTitle>
              <DialogDescription className="text-sm">
                Choose your preferred payment method
              </DialogDescription>
            </DialogHeader>
            <div className="px-5 pb-5 space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleMethodSelect(method.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{method.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-primary">{method.fee}</p>
                      <p className="text-[10px] text-muted-foreground">{method.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === "crypto" && (
          <>
            <DialogHeader className="px-4 pt-4 pb-0">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -ml-1 rounded-full"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Button>
                <div>
                  <DialogTitle className="text-sm font-semibold">Deposit Crypto</DialogTitle>
                  <DialogDescription className="text-xs">
                    Select network & token, then send to your wallet
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="px-4 pb-4 pt-3 space-y-3">
              {/* Network & Token Dropdowns */}
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Network</p>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger className="h-9 text-xs font-semibold bg-secondary/40 border-border/40 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${currentNetwork.color}`} />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {networks.map((net) => (
                        <SelectItem key={net.id} value={net.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${net.color}`} />
                            {net.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Token</p>
                  <Select value={selectedToken} onValueChange={setSelectedToken}>
                    <SelectTrigger className="h-9 text-xs font-semibold bg-secondary/40 border-border/40 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {tokens.map((tok) => (
                        <SelectItem key={tok.id} value={tok.id}>
                          {tok.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-border/30">
                  <QRCodeSVG 
                    value={currentAddress} 
                    size={120}
                    level="M"
                    includeMargin={false}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  Scan to deposit
                </p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Wallet Address</p>
                <button
                  onClick={handleCopyAddress}
                  className="w-full flex items-center gap-2 p-2.5 bg-secondary/40 hover:bg-secondary/60 rounded-lg border border-border/40 transition-all group"
                >
                  <div className="flex-1 font-mono text-xs truncate text-left">
                    {currentAddress}
                  </div>
                  <div className="shrink-0 h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Copy className="h-3 w-3 text-primary" />
                  </div>
                </button>
              </div>

              {/* Warning */}
              <div className="flex gap-2 p-2.5 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <div className="shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Only send <span className="font-semibold text-foreground">{currentToken.label}</span> on <span className="font-semibold text-foreground">{currentNetwork.label}</span>. Wrong tokens may cause permanent loss.
                </p>
              </div>

              {/* Done Button */}
              <Button 
                className="w-full h-9 text-sm font-semibold rounded-lg" 
                onClick={() => handleClose(false)}
              >
                <Check className="h-3.5 w-3.5 mr-1.5" />
                Done
              </Button>
            </div>
          </>
        )}

        {step === "amount" && (
          <>
            <DialogHeader className="p-5 pb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -ml-1"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle className="text-lg">Enter Amount</DialogTitle>
                  <DialogDescription className="text-xs">
                    {selectedMethodData?.label} • {selectedMethodData?.fee}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="px-5 pb-5 space-y-4">
              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">$</span>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10 pr-4 h-14 text-2xl font-bold text-center bg-secondary/30 border-border/50 focus:border-primary rounded-xl"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAmountSelect(amount)}
                    className={`flex-1 min-w-[60px] h-9 text-sm font-medium rounded-lg transition-all ${
                      selectedAmount === amount 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Summary */}
              {finalAmount > 0 && (
                <div className="p-3 rounded-lg bg-secondary/30 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${finalAmount.toFixed(2)}</span>
                  </div>
                  {selectedMethod === "card" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee (2.9%)</span>
                      <span className="font-medium">${(finalAmount * 0.029).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm pt-1.5 border-t border-border/50">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">
                      ${selectedMethod === "card" 
                        ? (finalAmount * 1.029).toFixed(2) 
                        : finalAmount.toFixed(2)
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button 
                className="w-full h-12 text-base font-semibold rounded-xl gap-2" 
                size="lg"
                disabled={finalAmount < 1}
              >
                <Check className="h-4 w-4" />
                Confirm Deposit
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
