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
    description: "USDT, USDC — Multi-chain",
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

type ChainId = "ethereum" | "polygon" | "bsc" | "arbitrum" | "avalanche" | "solana" | "tron" | "base";
type TokenId = "usdt" | "usdc";

interface ChainInfo {
  id: ChainId;
  name: string;
  shortName: string;
  color: string;
  address: string;
  confirmations: string;
}

const chains: ChainInfo[] = [
  { id: "ethereum", name: "Ethereum", shortName: "ETH", color: "bg-blue-500", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~5 min" },
  { id: "polygon", name: "Polygon", shortName: "MATIC", color: "bg-violet-500", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~2 min" },
  { id: "bsc", name: "BNB Chain", shortName: "BSC", color: "bg-yellow-500", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~1 min" },
  { id: "arbitrum", name: "Arbitrum", shortName: "ARB", color: "bg-sky-500", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~1 min" },
  { id: "avalanche", name: "Avalanche", shortName: "AVAX", color: "bg-red-500", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~2 min" },
  { id: "base", name: "Base", shortName: "BASE", color: "bg-blue-600", address: "0xF4E7cB4a23aEa16A819EF0f71F689fdb78A62", confirmations: "~1 min" },
  { id: "solana", name: "Solana", shortName: "SOL", color: "bg-gradient-to-r from-purple-500 to-teal-400", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", confirmations: "~30 sec" },
  { id: "tron", name: "Tron", shortName: "TRX", color: "bg-red-600", address: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9", confirmations: "~1 min" },
];

const tokens: { id: TokenId; name: string; symbol: string }[] = [
  { id: "usdt", name: "Tether", symbol: "USDT" },
  { id: "usdc", name: "USD Coin", symbol: "USDC" },
];

export function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainId>("polygon");
  const [selectedToken, setSelectedToken] = useState<TokenId>("usdc");

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
      setSelectedChain("polygon");
      setSelectedToken("usdc");
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

  const activeChain = chains.find(c => c.id === selectedChain)!;
  const activeToken = tokens.find(t => t.id === selectedToken)!;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeChain.address);
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
                  <DialogTitle className="text-sm font-semibold">Crypto Deposit</DialogTitle>
                  <DialogDescription className="text-xs">
                    Select token & network, then send to the address
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="px-4 pb-4 pt-3 space-y-3">
              {/* Token Selector */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Token</p>
                <div className="flex gap-2">
                  {tokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => setSelectedToken(token.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-sm font-semibold ${
                        selectedToken === token.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        token.id === "usdt" ? "bg-emerald-500/20 text-emerald-600" : "bg-blue-500/20 text-blue-600"
                      }`}>$</div>
                      {token.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chain Selector */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Network</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
                      className={`flex flex-col items-center gap-1 px-1.5 py-2 rounded-lg border-2 transition-all ${
                        selectedChain === chain.id
                          ? "border-primary bg-primary/5"
                          : "border-border/30 bg-secondary/20 hover:border-primary/20"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${chain.color}`} />
                      <span className={`text-[10px] font-medium leading-none ${
                        selectedChain === chain.id ? "text-foreground" : "text-muted-foreground"
                      }`}>{chain.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center pt-1">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-border/30">
                  <QRCodeSVG 
                    value={activeChain.address} 
                    size={110}
                    level="M"
                    includeMargin={false}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  Scan to deposit {activeToken.symbol}
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
                    {activeChain.address}
                  </div>
                  <div className="shrink-0 h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Copy className="h-3 w-3 text-primary" />
                  </div>
                </button>
              </div>

              {/* Network & Token Info */}
              <div className="flex gap-2 text-[10px]">
                <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/40 rounded-lg border border-border/30">
                  <div className={`w-3 h-3 rounded-full ${activeChain.color}`} />
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">{activeChain.name}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/40 rounded-lg border border-border/30">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-semibold">{activeChain.confirmations}</span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex gap-2 p-2.5 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <div className="shrink-0 w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-2.5 w-2.5 text-amber-500" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Only send <span className="font-semibold text-foreground">{activeToken.symbol}</span> on <span className="font-semibold text-foreground">{activeChain.name}</span>. Sending other tokens or using the wrong network may result in permanent loss.
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
