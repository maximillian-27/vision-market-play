import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Twitter, 
  Youtube, 
  Instagram,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Clock,
  Globe,
  Linkedin
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
  "Business",
  "Health",
];

const platforms = [
  { id: "twitter", name: "Twitter/X", icon: Twitter, placeholder: "https://twitter.com/username" },
  { id: "youtube", name: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@channel" },
  { id: "instagram", name: "Instagram", icon: Instagram, placeholder: "https://instagram.com/username" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/username" },
  { id: "website", name: "Website", icon: Globe, placeholder: "https://yourwebsite.com" },
];

export function BecomeCreatorDialog({ open, onOpenChange, onSuccess }: BecomeCreatorDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [otherTopic, setOtherTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [followerCounts, setFollowerCounts] = useState<Record<string, string>>({});
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

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
    setStep(6); // Success step
    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
      // Reset form
      setStep(1);
      setSelectedTopics([]);
      setOtherTopic("");
      setName("");
      setEmail("");
      setPhone("");
      setSocialLinks({});
      setFollowerCounts({});
      setMotivation("");
    }, 2500);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form on close
      setStep(1);
      setSelectedTopics([]);
      setOtherTopic("");
      setName("");
      setEmail("");
      setPhone("");
      setSocialLinks({});
      setFollowerCounts({});
      setMotivation("");
    }
    onOpenChange(open);
  };

  const isStep1Valid = selectedTopics.length > 0 || otherTopic.trim().length > 0;
  const isStep2Valid = name.trim().length > 2 && email.includes("@") && email.includes(".");
  const isStep3Valid = Object.values(socialLinks).some(link => link.trim().length > 0);
  const isStep4Valid = motivation.trim().length > 20;

  const getStepTitle = () => {
    switch(step) {
      case 1: return "What topics do you cover?";
      case 2: return "Contact information";
      case 3: return "Your platforms";
      case 4: return "Why become a creator?";
      case 5: return "Review & Submit";
      default: return "Become a Creator";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent hideClose className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="flex items-center gap-3 p-4 border-b border-border/40">
          <button
            onClick={() => handleClose(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-base font-semibold">Become a Creator</h2>
            {step <= 5 && (
              <p className="text-xs text-muted-foreground">Step {step} of {totalSteps} — {getStepTitle()}</p>
            )}
          </div>
        </div>
        <div className="p-6">

        {/* Progress bar */}
        {step <= 5 && (
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1: Topics */}
        {step === 1 && (
          <div className="space-y-4 py-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select topics you specialize in</Label>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Badge
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1.5 text-xs sm:text-sm transition-colors hover:bg-primary/10"
                    onClick={() => handleTopicToggle(topic)}
                  >
                    {selectedTopics.includes(topic) && <Check className="h-3 w-3 mr-1" />}
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherTopic" className="text-sm">Other (specify)</Label>
              <Input
                id="otherTopic"
                placeholder="e.g., Real Estate, AI, Climate..."
                value={otherTopic}
                onChange={(e) => setOtherTopic(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!isStep1Valid}
                size="sm"
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone Number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!isStep2Valid}
                size="sm"
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Platforms */}
        {step === 3 && (
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Where will you be sharing your markets?</Label>
              <p className="text-xs text-muted-foreground">Add at least one link so we can verify your presence.</p>
            </div>
            <div className="space-y-2.5">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <platform.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder={platform.placeholder}
                    value={socialLinks[platform.id] || ""}
                    onChange={(e) => setSocialLinks({...socialLinks, [platform.id]: e.target.value})}
                    className="flex-1 h-9 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(4)} 
                disabled={!isStep3Valid}
                size="sm"
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Motivation */}
        {step === 4 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-sm font-medium">Why do you want to become a creator?</Label>
              <p className="text-xs text-muted-foreground">Tell us about your goals and what markets you'd like to create</p>
              <Textarea
                id="motivation"
                placeholder="I want to become a creator because..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="resize-none text-sm min-h-[120px]"
                rows={5}
              />
              <p className="text-xs text-muted-foreground text-right">{motivation.length} / 500</p>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(3)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(5)} 
                disabled={!isStep4Valid}
                size="sm"
                className="gap-2"
              >
                Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4 py-2">
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Topics</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopics.map(topic => (
                    <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                  ))}
                  {otherTopic && <Badge variant="secondary" className="text-xs">{otherTopic}</Badge>}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Contact</p>
                <p className="font-medium">{name}</p>
                <p className="text-muted-foreground">{email}</p>
                {phone && <p className="text-muted-foreground">{phone}</p>}
              </div>

              <div className="p-3 rounded-lg bg-muted/50 space-y-1.5">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Platforms</p>
                {platforms.filter(p => socialLinks[p.id]).map(platform => (
                  <div key={platform.id} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <platform.icon className="h-3.5 w-3.5" />
                      {platform.name}
                    </span>
                    {followerCounts[platform.id] && (
                      <span className="text-muted-foreground">{Number(followerCounts[platform.id]).toLocaleString()} followers</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(4)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="sm"
                className="gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 6 && (
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Application Submitted!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our team will review your application and get back to you within 24 hours.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              You'll receive a confirmation email at {email}
            </p>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
