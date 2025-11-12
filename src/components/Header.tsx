import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, LogOut, Settings, User, Wallet, TrendingUp } from "lucide-react";
import pollgyLogo from "@/assets/pollgy-logo.png";
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
import { useNavigate } from "react-router-dom";

export function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [portfolioValue] = useState(12450);
  const [cashBalance] = useState(5230);

  const handleLogin = () => {
    // In a real app, this would trigger actual authentication
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20 w-full">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3 flex-1">
            {!isMobile && <SidebarTrigger />}
            <img 
              src={pollgyLogo} 
              alt="Pollgy" 
              className="h-6"
            />
            
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 bg-popover">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                {/* Portfolio & Cash - Hidden on small mobile */}
                <div className="hidden sm:flex items-center gap-3 mr-2">
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-semibold">${portfolioValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">${cashBalance.toLocaleString()}</span>
                  </div>
                </div>

                {/* Deposit Button */}
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => setShowDepositDialog(true)}
                >
                  <Wallet className="h-4 w-4 mr-1.5" />
                  {!isMobile && "Deposit"}
                </Button>
              </>
            )}

            {/* Login Button or Profile Menu */}
            {!isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  size="default"
                  className="hidden md:flex text-muted-foreground opacity-60 hover:opacity-100 transition-opacity"
                >
                  How it works?
                </Button>
                <Button size={isMobile ? "sm" : "default"} onClick={handleLogin}>
                  Login / Sign up
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Profile" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50 bg-popover">
                  {/* Mobile-only Portfolio & Cash */}
                  <div className="sm:hidden px-2 py-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Portfolio</span>
                      <span className="font-semibold text-success">${portfolioValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cash</span>
                      <span className="font-semibold">${cashBalance.toLocaleString()}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="sm:hidden" />
                  
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Add funds to your account to start trading
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl font-bold">$50</span>
                <span className="text-xs text-muted-foreground">Quick Deposit</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl font-bold">$100</span>
                <span className="text-xs text-muted-foreground">Quick Deposit</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl font-bold">$250</span>
                <span className="text-xs text-muted-foreground">Quick Deposit</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl font-bold">$500</span>
                <span className="text-xs text-muted-foreground">Quick Deposit</span>
              </Button>
            </div>
            <Button className="w-full" size="lg">
              Custom Amount
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
