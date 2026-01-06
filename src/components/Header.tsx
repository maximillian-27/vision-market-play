import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, LogOut, Settings, Search, Home, Newspaper, Users, MessageSquare, Briefcase, Sparkles, Shield, Plus, Moon, Sun, HelpCircle, FileText, Twitter, Instagram, Linkedin, Gift } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { BecomeCreatorDialog } from "@/components/BecomeCreatorDialog";
import { CreateMarketButton } from "@/components/CreateMarketButton";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";
import { DepositDialog } from "@/components/DepositDialog";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { AffiliateDialog } from "@/components/AffiliateDialog";

export function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin] = useState(true);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showAffiliateDialog, setShowAffiliateDialog] = useState(false);
  const [portfolioValue] = useState(12450);
  const [cashBalance] = useState(5230);
  const [affiliateEarnings] = useState(1847.50);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
      <header className="border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 fixed top-0 z-50 w-full">
        <div className="flex h-14 items-center px-4 lg:px-6 gap-4 max-w-[1600px] mx-auto">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src={pollgyLogo} 
              alt="Pollgy" 
              className="h-7 dark:brightness-0 dark:invert"
            />
          </button>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-1 ml-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  activeClassName="text-primary bg-primary-muted"
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Search - Desktop */}
          <form 
            className="hidden md:flex relative flex-1 max-w-sm ml-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get("search") as string;
              if (query.trim()) {
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              name="search"
              placeholder="Search markets or profiles" 
              className="pl-9 h-9 bg-secondary border-transparent hover:bg-secondary-hover focus-visible:bg-background focus-visible:border-border text-sm rounded-lg"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-popover rounded-lg border-border">
                <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Español</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Français</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          
            {isLoggedIn && (
              <>
                {/* Notifications */}
                <NotificationsDropdown />
                
                {/* Deposit Button */}
                <Button 
                  size="sm" 
                  onClick={() => setShowDepositDialog(true)}
                  className="h-8 text-xs gap-1.5 font-semibold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Deposit</span>
                </Button>
              </>
            )}

            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowHowItWorks(true)}
                  className="hidden md:flex text-muted-foreground text-xs font-medium hover:text-foreground"
                >
                  How it works?
                </Button>
                
                {/* Mobile: Info dropdown when not logged in */}
                {isMobile && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 z-50 bg-popover rounded-lg border-border p-2">
                      <DropdownMenuItem onClick={() => setShowHowItWorks(true)} className="gap-2.5 py-2 cursor-pointer rounded-md">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        How it works?
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <div className="px-2 py-1.5">
                        <p className="text-[10px] text-muted-foreground mb-1.5">Legal & Info</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                          <a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</a>
                          <a href="/terms" className="text-muted-foreground hover:text-foreground">Terms</a>
                          <a href="/careers" className="text-muted-foreground hover:text-foreground">Careers</a>
                          <a href="/press" className="text-muted-foreground hover:text-foreground">Press</a>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-3.5 w-3.5" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="h-3.5 w-3.5" />
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        <p className="text-[10px] text-muted-foreground/60 mt-2">© {new Date().getFullYear()} Pollgy LLC</p>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                
                <Button 
                  variant="outline"
                  size="sm" 
                  onClick={handleLogin}
                  className="h-8 text-xs font-medium"
                >
                  Log in
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleLogin}
                  className="h-8 text-xs font-semibold"
                >
                  Sign up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full transition-transform hover:scale-105">
                    <Avatar className="h-8 w-8 ring-2 ring-border">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Profile" />
                      <AvatarFallback className="bg-primary-muted text-primary font-medium text-xs">U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50 bg-popover rounded-lg border-border p-1.5">
                  {/* Balance Section */}
                  <div className="px-2 py-2.5 space-y-2 bg-secondary rounded-lg mb-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Portfolio</span>
                      <span className="font-semibold text-primary">${portfolioValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cash</span>
                      <span className="font-semibold">${cashBalance.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <DropdownMenuItem onClick={() => navigate("/portfolio")} className="gap-2.5 py-2 cursor-pointer rounded-md">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Portfolio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="gap-2.5 py-2 cursor-pointer rounded-md">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    Settings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => setShowAffiliateDialog(true)} className="gap-2.5 py-2 cursor-pointer rounded-md">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Refer a Friend</span>
                      <span className="text-xs text-primary font-medium">${affiliateEarnings.toLocaleString()}</span>
                    </div>
                  </DropdownMenuItem>
                  
                  {isCreator ? (
                    <DropdownMenuItem onClick={() => navigate("/creator-dashboard")} className="gap-2.5 py-2 cursor-pointer rounded-md">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">Creator Dashboard</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => setShowCreatorDialog(true)} className="gap-2.5 py-2 cursor-pointer rounded-md">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      Become a Creator
                    </DropdownMenuItem>
                  )}
                  
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="gap-2.5 py-2 cursor-pointer rounded-md">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Admin
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={toggleTheme} className="gap-2.5 py-2 cursor-pointer rounded-md">
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => setShowHowItWorks(true)} className="gap-2.5 py-2 cursor-pointer rounded-md">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    How it works?
                  </DropdownMenuItem>
                  
                  {isMobile && (
                    <>
                      <DropdownMenuSeparator className="my-1" />
                      <div className="px-2 py-1.5">
                        <p className="text-[10px] text-muted-foreground mb-1.5">Legal & Info</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                          <a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</a>
                          <a href="/terms" className="text-muted-foreground hover:text-foreground">Terms</a>
                          <a href="/careers" className="text-muted-foreground hover:text-foreground">Careers</a>
                          <a href="/press" className="text-muted-foreground hover:text-foreground">Press</a>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-3.5 w-3.5" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="h-3.5 w-3.5" />
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        <p className="text-[10px] text-muted-foreground/60 mt-2">© {new Date().getFullYear()} Pollgy LLC</p>
                      </div>
                    </>
                  )}
                  
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem onClick={handleLogout} className="gap-2.5 py-2 cursor-pointer text-destructive focus:text-destructive rounded-md">
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

      {/* How It Works Dialog */}
      <HowItWorksDialog 
        open={showHowItWorks} 
        onOpenChange={setShowHowItWorks}
      />

      {/* Deposit Dialog */}
      <DepositDialog open={showDepositDialog} onOpenChange={setShowDepositDialog} />

      {/* Affiliate Dialog */}
      <AffiliateDialog open={showAffiliateDialog} onOpenChange={setShowAffiliateDialog} />
    </>
  );
}