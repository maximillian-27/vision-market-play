import { createContext, useContext, ReactNode } from "react";
import { useBetSlip } from "@/hooks/useBetSlip";
import { BetSlipItem } from "@/components/BetSlip";

interface BetSlipContextType {
  items: BetSlipItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToBetSlip: (marketId: string, marketTitle: string, outcome: string, odds: number) => void;
  removeFromBetSlip: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
  clearBetSlip: () => void;
  isInBetSlip: (marketId: string, outcome: string) => boolean;
  getSelectedOutcome: (marketId: string) => string | undefined;
  totalStake: number;
  totalPotentialPayout: number;
  itemCount: number;
}

const BetSlipContext = createContext<BetSlipContextType | null>(null);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const betSlip = useBetSlip();

  return (
    <BetSlipContext.Provider value={betSlip}>
      {children}
    </BetSlipContext.Provider>
  );
}

export function useBetSlipContext() {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error("useBetSlipContext must be used within BetSlipProvider");
  }
  return context;
}
