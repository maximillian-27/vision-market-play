import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Smartphone, Wifi, WifiOff, Zap, Shield, CheckCircle2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const benefits = [
    { icon: Zap, title: "Fast Loading", description: "Opens instantly, even on slow networks" },
    { icon: WifiOff, title: "Works Offline", description: "Access markets even without internet" },
    { icon: Shield, title: "Save Data", description: "Uses less mobile data than browser" },
    { icon: Smartphone, title: "Home Screen", description: "Quick access like a native app" },
  ];

  if (isInstalled) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-yes/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-yes" />
          </div>
          <h1 className="text-xl font-bold">App Installed!</h1>
          <p className="text-muted-foreground text-sm">
            Pollgy is now on your home screen. You can close this browser and use the app directly.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-lg">
            <span className="text-3xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-2xl font-bold">Install Pollgy</h1>
          <p className="text-muted-foreground text-sm">
            Get the full app experience on your phone
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-4 space-y-2">
              <benefit.icon className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-sm">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Install Instructions */}
        <Card className="p-4 space-y-4">
          {deferredPrompt ? (
            <>
              <h2 className="font-semibold">Ready to Install</h2>
              <Button onClick={handleInstall} className="w-full gap-2" size="lg">
                <Download className="h-5 w-5" />
                Install Pollgy
              </Button>
            </>
          ) : isIOS ? (
            <>
              <h2 className="font-semibold">Install on iPhone/iPad</h2>
              <ol className="text-sm text-muted-foreground space-y-3">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> button at the bottom of Safari</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">2</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">3</span>
                  <span>Tap <strong>"Add"</strong> in the top right</span>
                </li>
              </ol>
            </>
          ) : isAndroid ? (
            <>
              <h2 className="font-semibold">Install on Android</h2>
              <ol className="text-sm text-muted-foreground space-y-3">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">1</span>
                  <span>Tap the <strong>menu (⋮)</strong> in your browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">2</span>
                  <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0">3</span>
                  <span>Tap <strong>"Install"</strong> to confirm</span>
                </li>
              </ol>
            </>
          ) : (
            <>
              <h2 className="font-semibold">Install on Your Device</h2>
              <p className="text-sm text-muted-foreground">
                Look for an "Install" or "Add to Home Screen" option in your browser's menu.
              </p>
            </>
          )}
        </Card>

        {/* Data Savings Info */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Wifi className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm">Save up to 50% data</h3>
              <p className="text-xs text-muted-foreground mt-1">
                The installed app caches content locally, reducing data usage on repeat visits.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
