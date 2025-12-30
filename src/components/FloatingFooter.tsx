import { useState, useEffect } from "react";
import { ExternalLink, Mail, FileText, Shield, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on mobile - info will be in dropdown menu
  if (isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between gap-4 text-xs">
            {/* Left: Risk Disclaimer */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
              <span className="hidden lg:inline">Trading involves risk. Past performance is not indicative of future results.</span>
              <span className="lg:hidden">Trading involves risk.</span>
            </div>

            {/* Center: Links */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <a 
                href="/terms" 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <FileText className="h-3 w-3" />
                <span>Terms</span>
              </a>
              <a 
                href="/privacy" 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Shield className="h-3 w-3" />
                <span>Privacy</span>
              </a>
              <a 
                href="mailto:support@pollgy.com" 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>Support</span>
              </a>
              <a 
                href="/responsible-trading" 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="hidden sm:inline">Responsible Trading</span>
                <span className="sm:hidden">Info</span>
              </a>
            </div>

            {/* Right: Copyright */}
            <div className="text-muted-foreground hidden md:block">
              © {new Date().getFullYear()} Pollgy. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export footer info for mobile dropdown
export const footerLinks = [
  { label: "Terms of Service", href: "/terms", icon: FileText },
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Support", href: "mailto:support@pollgy.com", icon: Mail },
  { label: "Responsible Trading", href: "/responsible-trading", icon: ExternalLink },
];

export const riskDisclaimer = "Trading involves risk. Past performance is not indicative of future results.";
