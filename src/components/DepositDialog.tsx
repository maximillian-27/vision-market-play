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

// Mock crypto wallet data
const cryptoWalletData = {
  address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62",
  network: "Polygon",
  token: "USDC",
};

export function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

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
    navigator.clipboard.writeText(cryptoWalletData.address);
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
            <DialogHeader className="p-5 pb-2">
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
                  <DialogTitle className="text-lg">Deposit {cryptoWalletData.token}</DialogTitle>
                  <DialogDescription className="text-xs">
                    Send {cryptoWalletData.token} on {cryptoWalletData.network} to your wallet
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="px-5 pb-5 space-y-4">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl border border-border/60 shadow-sm">
                  <QRCodeSVG 
                    value={cryptoWalletData.address} 
                    size={180}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Scan to deposit</p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Your Wallet Address</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2.5 bg-secondary/50 rounded-lg border border-border/50 font-mono text-sm truncate">
                    {cryptoWalletData.address}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Network & Token Info */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Network</p>
                  <p className="text-sm font-semibold mt-0.5">{cryptoWalletData.network}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Token</p>
                  <p className="text-sm font-semibold mt-0.5">{cryptoWalletData.token}</p>
                </div>
              </div>

              {/* Warning */}
              <div className="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  Only send <span className="font-semibold">{cryptoWalletData.token}</span> on <span className="font-semibold">{cryptoWalletData.network}</span> network. Other tokens or networks may result in permanent loss of funds.
                </p>
              </div>

              {/* Done Button */}
              <Button 
                className="w-full h-12 text-base font-semibold rounded-xl" 
                size="lg"
                onClick={() => handleClose(false)}
              >
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
