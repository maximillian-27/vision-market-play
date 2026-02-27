import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";

interface CreatorsPartnersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: () => void;
}

export function CreatorsPartnersDialog({ open, onOpenChange, onRegister }: CreatorsPartnersDialogProps) {
  const benefits = [
    {
      icon: Sparkles,
      title: "Create Markets",
      description: "Launch prediction markets on any topic and earn fees from every trade.",
    },
    {
      icon: TrendingUp,
      title: "Earn Revenue Share",
      description: "Get a percentage of trading volume on markets you create — passive income that grows.",
    },
    {
      icon: Users,
      title: "Refer & Earn",
      description: "Earn 10% of revenue from every user you refer for 12 months.",
    },
    {
      icon: DollarSign,
      title: "Build Your Brand",
      description: "Gain followers, build credibility, and become a top voice in prediction markets.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Creators & Partners</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Turn your knowledge into income. Create markets, grow your audience, and earn.
          </p>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-3 items-start p-3 rounded-lg bg-secondary/50">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            onOpenChange(false);
            onRegister();
          }}
          className="w-full gap-2 mt-1"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
