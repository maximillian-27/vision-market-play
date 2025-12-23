import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Twitter, 
  Youtube, 
  Instagram,
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";

interface BecomeCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const topics = [
  "Crypto",
  "Politics",
  "Sports",
  "Finance",
  "Technology",
  "Entertainment",
  "Science",
  "Gaming",
];

const platforms = [
  { id: "twitter", name: "Twitter/X", icon: Twitter },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "instagram", name: "Instagram", icon: Instagram },
];

export function BecomeCreatorDialog({ open, onOpenChange, onSuccess }: BecomeCreatorDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [followerCount, setFollowerCount] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(3);
    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
      setStep(1);
    }, 2000);
  };

  const isStep1Valid = selectedTopics.length > 0;
  const isStep2Valid = bio.length > 10 && followerCount !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Become a Creator
          </DialogTitle>
          <DialogDescription>
            Create prediction markets and build your audience
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-base">What topics do you specialize in?</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Badge
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1.5 text-sm transition-colors hover:bg-primary/10"
                    onClick={() => handleTopicToggle(topic)}
                  >
                    {selectedTopics.includes(topic) && <Check className="h-3 w-3 mr-1" />}
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!isStep1Valid}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label htmlFor="bio">Creator Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell your audience what makes you a great prediction market creator..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Social Media Presence</Label>
              <p className="text-sm text-muted-foreground">Optional but helps build credibility</p>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center gap-3">
                    <platform.icon className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder={`Your ${platform.name} URL`}
                      value={socialLinks[platform.id] || ""}
                      onChange={(e) => setSocialLinks({...socialLinks, [platform.id]: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="followers">Total Social Following</Label>
              <Input
                id="followers"
                type="number"
                placeholder="e.g., 10000"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Combined followers across all platforms</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isStep2Valid || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Welcome, Creator!</h3>
              <p className="text-sm text-muted-foreground">Your creator profile is now active</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
