import { Link } from "react-router-dom";
import { Twitter, Instagram, Send, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-sm py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-1 gap-y-2">
          <span>Pollgy © {currentYear}</span>
          <span className="hidden md:inline">·</span>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
          <span>·</span>
          <Link to="/learn" className="hover:text-foreground transition-colors">Learn</Link>
          <span>·</span>
          <Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link>
          <span>·</span>
          <Link to="/press" className="hover:text-foreground transition-colors">Press</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Send className="h-4 w-4" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
