import { useState, useCallback, useMemo } from "react";
import { BetSlipItem } from "@/components/BetSlip";

export function useBetSlip() {
  const [items, setItems] = useState<BetSlipItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToBetSlip = useCallback((
    marketId: string,
    marketTitle: string,
    outcome: string,
    odds: number
  ) => {
    const id = `${marketId}-${outcome}`;
    
    setItems(prev => {
      // Check if already in slip
      const exists = prev.find(item => item.id === id);
      if (exists) {
        // Remove if clicking same outcome
        return prev.filter(item => item.id !== id);
      }
      
      // Remove any other outcome from same market
      const filtered = prev.filter(item => item.marketId !== marketId);
      
      // Add new item
      return [...filtered, {
        id,
        marketId,
        marketTitle,
        outcome,
        odds,
        stake: 10
      }];
    });
  }, []);

  const removeFromBetSlip = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateStake = useCallback((id: string, stake: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, stake: Math.max(0, stake) } : item
    ));
  }, []);

  const clearBetSlip = useCallback(() => {
    setItems([]);
  }, []);

  const isInBetSlip = useCallback((marketId: string, outcome: string) => {
    return items.some(item => item.id === `${marketId}-${outcome}`);
  }, [items]);

  const getSelectedOutcome = useCallback((marketId: string) => {
    const item = items.find(item => item.marketId === marketId);
    return item?.outcome;
  }, [items]);

  const totalStake = useMemo(() => {
    return items.reduce((sum, item) => sum + item.stake, 0);
  }, [items]);

  const totalPotentialPayout = useMemo(() => {
    return items.reduce((sum, item) => {
      const decimal = 100 / item.odds;
      return sum + (item.stake * decimal);
    }, 0);
  }, [items]);

  return {
    items,
    isOpen,
    setIsOpen,
    addToBetSlip,
    removeFromBetSlip,
    updateStake,
    clearBetSlip,
    isInBetSlip,
    getSelectedOutcome,
    totalStake,
    totalPotentialPayout,
    itemCount: items.length
  };
}
