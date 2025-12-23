import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Check, AlertCircle, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Crypto",
  "Politics",
  "Sports",
  "Finance",
  "Technology",
  "Entertainment",
  "Science",
];

interface AIRecommendation {
  type: "success" | "warning" | "suggestion";
  message: string;
}

export function CreateMarketButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiChecked, setAiChecked] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [outcomes, setOutcomes] = useState<string[]>(["Yes", "No"]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    endDate: "",
    resolutionCriteria: "",
    resolutionSource: "",
  });

  const addOutcome = () => {
    if (outcomes.length < 10) {
      setOutcomes([...outcomes, ""]);
    }
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index));
    }
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const handleAICheck = async () => {
    setIsChecking(true);
    
    // Simulate AI check
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: AIRecommendation[] = [];
    
    if (formData.title.length < 20) {
      mockRecommendations.push({
        type: "suggestion",
        message: "Consider making your question more specific for better engagement."
      });
    }
    
    if (!formData.resolutionCriteria || formData.resolutionCriteria.length < 30) {
      mockRecommendations.push({
        type: "warning",
        message: "Add more detailed resolution criteria to avoid disputes."
      });
    }
    
    if (!formData.resolutionSource) {
      mockRecommendations.push({
        type: "suggestion",
        message: "Specify a trusted source for resolution verification."
      });
    }
    
    if (mockRecommendations.length === 0) {
      mockRecommendations.push({
        type: "success",
        message: "Your market looks great! Ready for submission."
      });
    }
    
    setRecommendations(mockRecommendations);
    setAiChecked(true);
    setIsChecking(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setAiChecked(false);
      setSubmitted(false);
      setRecommendations([]);
      setOutcomes(["Yes", "No"]);
      setFormData({
        title: "",
        description: "",
        category: "",
        endDate: "",
        resolutionCriteria: "",
        resolutionSource: "",
      });
    }, 300);
  };

  const canProceedStep1 = formData.title && formData.description && formData.category;
  const canProceedStep2 = outcomes.filter(o => o.trim()).length >= 2 && formData.resolutionCriteria;
  const canProceedStep3 = formData.endDate;

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Market Submitted!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Our moderation team will review your market and notify you of any needed changes or when it's approved. This usually takes less than 24 hours.
          </p>
          <Button onClick={handleClose} className="mt-4">
            Done
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Market Question *</Label>
              <Input
                id="title"
                placeholder="Will [event] happen by [date]?"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">Make it clear and specific</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide context about the market..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Outcomes *</Label>
                <span className="text-xs text-muted-foreground">{outcomes.length}/10</span>
              </div>
              
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Outcome ${index + 1}`}
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                  />
                  {outcomes.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeOutcome(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {outcomes.length < 10 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={addOutcome}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Outcome
                </Button>
              )}
              
              <p className="text-xs text-muted-foreground">Minimum 2 outcomes required</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolutionCriteria">Resolution Criteria *</Label>
              <Textarea
                id="resolutionCriteria"
                placeholder="Describe exactly how this market will be resolved..."
                value={formData.resolutionCriteria}
                onChange={(e) => setFormData({...formData, resolutionCriteria: e.target.value})}
                className="resize-none"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Be specific to avoid disputes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolutionSource">Resolution Source</Label>
              <Input
                id="resolutionSource"
                placeholder="e.g., Official announcement, Reuters, etc."
                value={formData.resolutionSource}
                onChange={(e) => setFormData({...formData, resolutionSource: e.target.value})}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">Market End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">When trading should close</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <h4 className="font-medium text-sm">Market Summary</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Question:</span> {formData.title}</p>
                <p><span className="text-muted-foreground">Category:</span> {formData.category}</p>
                <p><span className="text-muted-foreground">Outcomes:</span> {outcomes.filter(o => o.trim()).join(" / ")}</p>
              </div>
            </div>

            {!aiChecked && (
              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Review Required
                </div>
                <p className="text-xs text-muted-foreground">
                  Before submitting, our AI will review your market for clarity, potential issues, and suggest improvements.
                </p>
              </div>
            )}

            {aiChecked && recommendations.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Check className="h-4 w-4" />
                  AI Review Complete
                </div>
                {recommendations.map((rec, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
                      rec.type === "success" ? "bg-green-500/10 text-green-600" :
                      rec.type === "warning" ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {rec.type === "success" ? <Check className="h-4 w-4 mt-0.5 shrink-0" /> : 
                     <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />}
                    {rec.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg gap-0 z-40"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {!submitted && (
            <DialogHeader>
              <DialogTitle>Create a Market</DialogTitle>
              <DialogDescription>
                Step {step} of 3 — {step === 1 ? "Basic Info" : step === 2 ? "Outcomes & Resolution" : "Review & Submit"}
              </DialogDescription>
            </DialogHeader>
          )}

          <div className="py-2">
            {!submitted && (
              <div className="flex gap-1 mb-4">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      s <= step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            )}

            {renderStep()}

            {!submitted && (
              <div className="flex justify-between gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => step > 1 ? setStep(step - 1) : handleClose()}
                >
                  {step > 1 ? <><ChevronLeft className="h-4 w-4 mr-1" /> Back</> : "Cancel"}
                </Button>
                
                {step < 3 ? (
                  <Button 
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : !aiChecked ? (
                  <Button 
                    onClick={handleAICheck}
                    disabled={!canProceedStep3 || isChecking}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {isChecking ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Checking...</>
                    ) : (
                      <><Sparkles className="h-4 w-4 mr-2" /> Check with AI</>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      "Submit Market"
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
