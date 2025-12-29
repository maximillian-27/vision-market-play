import { Link } from "react-router-dom";
import { Twitter, MessageCircle, Mail, ExternalLink } from "lucide-react";
import pollgyLogo from "@/assets/pollgy-logo-new.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: "Markets", href: "/" },
    { label: "News", href: "/news" },
    { label: "Community", href: "/community" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  const resourceLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Creator Program", href: "/become-creator" },
    { label: "API Documentation", href: "/docs/api" },
    { label: "Help Center", href: "/help" },
  ];

  const legalLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Risk Disclosure", href: "/risk-disclosure" },
    { label: "Responsible Trading", href: "/responsible-trading" },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/pollgy" },
    { icon: MessageCircle, label: "Discord", href: "https://discord.gg/pollgy" },
    { icon: Mail, label: "Contact", href: "mailto:support@pollgy.com" },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={pollgyLogo} alt="Pollgy" className="h-8 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              The prediction market platform where you can trade on the outcomes of real-world events. 
              Make informed predictions and earn rewards for your insights.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="mt-10 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-destructive">Risk Warning:</span> Trading on prediction markets involves substantial risk of loss and is not suitable for all investors. 
            Past performance is not indicative of future results. Only trade with funds you can afford to lose. 
            Please read our Risk Disclosure before trading.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Pollgy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">
              Trading fees are non-refundable
            </span>
            <a
              href="https://status.pollgy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              System Status
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
