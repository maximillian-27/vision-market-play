import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { InstallPrompt } from "@/components/InstallPrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
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
import Install from "./pages/Install";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optimize for slow networks
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false, // Save data on mobile
    },
  },
});

function AppContent() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full relative">
      <main className={`flex-1 w-full ${isMobile ? 'pb-16 overflow-x-hidden pt-14' : 'pt-14 pb-10'}`}>
        <Header />
        <OfflineIndicator />
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
          <Route path="/install" element={<Install />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isMobile ? <MobileNav /> : <Footer />}
      <InstallPrompt />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
