import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { BetSlipProvider, useBetSlipContext } from "@/contexts/BetSlipContext";
import { BetSlip, BetSlipButton } from "@/components/BetSlip";
import { ResponsibleGamblingBanner } from "@/components/ResponsibleGamblingBanner";
import { useState } from "react";
import Feed from "./pages/Feed";
import CommunityFeed from "./pages/CommunityFeed";
import News from "./pages/News";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import CreatorProfile from "./pages/CreatorProfile";
import MarketDetail from "./pages/MarketDetail";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import CreatorDashboard from "./pages/CreatorDashboard";
import Admin from "./pages/Admin";
import Search from "./pages/Search";

const queryClient = new QueryClient();

function BetSlipContainer() {
  const { items, isOpen, setIsOpen, removeFromBetSlip, updateStake, clearBetSlip, itemCount } = useBetSlipContext();
  const isMobile = useIsMobile();
  const [balance] = useState(5230);

  const handlePlaceBets = () => {
    clearBetSlip();
    setIsOpen(false);
  };

  return (
    <>
      <BetSlip
        open={isOpen}
        onOpenChange={setIsOpen}
        items={items}
        onRemoveItem={removeFromBetSlip}
        onUpdateStake={updateStake}
        onClearAll={clearBetSlip}
        onPlaceBets={handlePlaceBets}
        balance={balance}
      />
      {isMobile && (
        <BetSlipButton itemCount={itemCount} onClick={() => setIsOpen(true)} />
      )}
    </>
  );
}

function AppContent() {
  const isMobile = useIsMobile();
  const { isOpen: betSlipOpen } = useBetSlipContext();
  const [sessionStart] = useState(new Date());
  const [showResponsibleBanner] = useState(true);

  return (
    <div className="min-h-screen flex w-full relative">
      <main className={`flex-1 w-full ${isMobile ? 'pb-16 overflow-x-hidden pt-14' : 'pt-14 pb-10'} ${!isMobile && betSlipOpen ? 'mr-80' : ''}`}>
        <Header />
        {showResponsibleBanner && !isMobile && (
          <ResponsibleGamblingBanner 
            sessionStartTime={sessionStart}
            dailyLimit={500}
            dailySpent={125}
          />
        )}
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/market/:id" element={<MarketDetail />} />
          <Route path="/community-feed" element={<CommunityFeed />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/creator/:userId" element={<CreatorProfile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isMobile ? <MobileNav /> : <Footer />}
      <BetSlipContainer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <BetSlipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </BetSlipProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
