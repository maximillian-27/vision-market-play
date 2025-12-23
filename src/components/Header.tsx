import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, LogOut, Settings, Wallet, Search, Home, Newspaper, Users, MessageSquare, Briefcase, Sparkles, Shield, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import pollgyLogo from "@/assets/pollgy-logo-new.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { BecomeCreatorDialog } from "@/components/BecomeCreatorDialog";
import { CreateMarketButton } from "@/components/CreateMarketButton";

export function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin] = useState(true);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  const [portfolioValue] = useState(12450);
  const [cashBalance] = useState(5230);

  const navItems = [
    { title: "Markets", url: "/", icon: Home },
    { title: "Community", url: "/community-feed", icon: MessageSquare },
    { title: "News", url: "/news", icon: Newspaper },
    { title: "Leaderboards", url: "/community", icon: Users },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCreator(false);
  };

  const handleBecomeCreator = () => {
    setIsCreator(true);
  };

  return (
    <>
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 fixed top-0 z-50 w-full">
        <div className="flex h-14 items-center px-4 lg:px-6 gap-3 max-w-[1600px] mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={pollgyLogo} 
              alt="Pollgy" 
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-1 ml-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200"
                  activeClassName="font-semibold text-foreground bg-muted"
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Search - Desktop */}
          <div className="hidden md:flex relative flex-1 max-w-sm ml-auto mr-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input 
              placeholder="Search markets..." 
              className="pl-10 h-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-background"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-popover rounded-xl border-border/60 shadow-elevated">
                <DropdownMenuItem className="rounded-lg">English</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Español</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Français</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          
            {isLoggedIn && (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
                </Button>
                
                {/* Deposit Button */}
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowDepositDialog(true)}
                  className="h-9 text-xs font-semibold gap-1.5 rounded-xl border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Deposit</span>
                </Button>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hidden md:flex text-muted-foreground hover:text-foreground rounded-xl"
                >
                  How it works?
                </Button>
                <Button 
                  size="sm" 
                  variant="login"
                  onClick={handleLogin}
                  className="rounded-xl font-semibold"
                >
                  {isMobile ? "Login" : "Login / Sign up"}
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full transition-transform hover:scale-105">
                    <Avatar className="h-9 w-9 ring-2 ring-border/60 ring-offset-2 ring-offset-background">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Profile" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 z-50 bg-popover rounded-2xl border-border/60 shadow-elevated p-2">
                  {/* Balance Section */}
                  <div className="px-3 py-3 space-y-2 bg-muted/50 rounded-xl mb-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Portfolio</span>
                      <span className="font-bold text-success">${portfolioValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cash</span>
                      <span className="font-bold">${cashBalance.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <DropdownMenuItem onClick={() => navigate("/portfolio")} className="gap-3 rounded-xl py-2.5 cursor-pointer">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Portfolio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="gap-3 rounded-xl py-2.5 cursor-pointer">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    Settings
                  </DropdownMenuItem>
                  
                  {isCreator ? (
                    <DropdownMenuItem onClick={() => navigate("/creator-dashboard")} className="gap-3 rounded-xl py-2.5 cursor-pointer">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">Creator Dashboard</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => setShowCreatorDialog(true)} className="gap-3 rounded-xl py-2.5 cursor-pointer">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      Become a Creator
                    </DropdownMenuItem>
                  )}
                  
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="gap-3 rounded-xl py-2.5 cursor-pointer">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Admin
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem onClick={handleLogout} className="gap-3 rounded-xl py-2.5 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Show create market button for creators */}
      {isLoggedIn && isCreator && <CreateMarketButton />}

      {/* Become Creator Dialog */}
      <BecomeCreatorDialog 
        open={showCreatorDialog} 
        onOpenChange={setShowCreatorDialog}
        onSuccess={handleBecomeCreator}
      />

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="z-50 rounded-2xl border-border/60 shadow-elevated max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">Deposit Funds</DialogTitle>
            <DialogDescription>
              Add funds to your account to start trading
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button 
                  key={amount}
                  variant="outline" 
                  className="h-20 flex-col rounded-xl border-border/60 hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="text-2xl font-bold">${amount}</span>
                  <span className="text-[10px] text-muted-foreground">Quick Deposit</span>
                </Button>
              ))}
            </div>
            <Button className="w-full rounded-xl" size="lg">
              Custom Amount
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}