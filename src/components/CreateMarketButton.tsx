import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Check, AlertCircle, Lightbulb, ChevronLeft, Loader2, X, Zap, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
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

const stepLabels = ["Create", "Review", "Fix"];

interface AIRecommendation {
  type: "success" | "warning" | "suggestion";
  field?: string;
  message: string;
}

export function CreateMarketButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiScore, setAiScore] = useState(0);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [outcomes, setOutcomes] = useState<string[]>(["Yes", "No"]);
  const [hasIssues, setHasIssues] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    endDate: "",
    resolutionCriteria: "",
    resolutionSource: "",
  });

  const addOutcome = () => {
    if (outcomes.length < 10) setOutcomes([...outcomes, ""]);
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const runAICheck = useCallback(async () => {
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const recs: AIRecommendation[] = [];
    let score = 10;

    if (formData.title.length < 20) {
      recs.push({ type: "suggestion", field: "title", message: "Make your question more specific for better engagement." });
      score -= 1;
    }
    if (!formData.resolutionCriteria || formData.resolutionCriteria.length < 30) {
      recs.push({ type: "warning", field: "resolutionCriteria", message: "Add more detailed resolution criteria to avoid disputes." });
      score -= 2;
    }
    if (!formData.resolutionSource) {
      recs.push({ type: "suggestion", field: "resolutionSource", message: "Add a trusted source for resolution verification." });
      score -= 1;
    }
    if (formData.description.length < 30) {
      recs.push({ type: "suggestion", field: "description", message: "A longer description helps traders understand the market better." });
      score -= 1;
    }

    if (recs.length === 0) {
      recs.push({ type: "success", message: "Your market looks great! Ready to post." });
    }

    const issues = recs.some(r => r.type === "warning" || r.type === "suggestion");
    setAiScore(Math.max(score, 1));
    setRecommendations(recs);
    setHasIssues(issues);
    setIsChecking(false);
  }, [formData]);

  // Auto-trigger AI check when entering step 2
  useEffect(() => {
    if (step === 2) {
      runAICheck();
    }
  }, [step, runAICheck]);

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
      setSubmitted(false);
      setRecommendations([]);
      setAiScore(0);
      setHasIssues(false);
      setOutcomes(["Yes", "No"]);
      setFormData({ title: "", description: "", category: "", endDate: "", resolutionCriteria: "", resolutionSource: "" });
    }, 300);
  };

  const canProceedStep1 =
    formData.title && formData.description && formData.category &&
    formData.endDate && formData.resolutionCriteria &&
    outcomes.filter(o => o.trim()).length >= 2;

  const getFieldRec = (field: string) => recommendations.find(r => r.field === field);

  const ScoreRing = ({ score }: { score: number }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 10) * circumference;
    const color = score >= 8 ? "hsl(var(--primary))" : score >= 5 ? "hsl(45 93% 47%)" : "hsl(0 84% 60%)";

    return (
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={circumference - progress}
            strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-xs text-muted-foreground">/10</span>
        </div>
      </div>
    );
  };

  const FieldWrapper = ({ field, children }: { field: string; children: React.ReactNode }) => {
    const rec = getFieldRec(field);
    if (!rec) return <>{children}</>;
    return (
      <div className="space-y-1">
        {children}
        <div className={`flex items-start gap-1.5 text-xs px-1 ${
          rec.type === "warning" ? "text-yellow-600 dark:text-yellow-400" : "text-blue-600 dark:text-blue-400"
        }`}>
          {rec.type === "warning" ? <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" /> : <Lightbulb className="h-3 w-3 mt-0.5 shrink-0" />}
          {rec.message}
        </div>
      </div>
    );
  };

  const FormFields = ({ showOnlyFlagged = false }: { showOnlyFlagged?: boolean }) => {
    const flaggedFields = recommendations.filter(r => r.field).map(r => r.field);
    const show = (field: string) => !showOnlyFlagged || flaggedFields.includes(field);

    return (
      <div className="space-y-3">
        {show("title") && (
          <FieldWrapper field="title">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs">Market Question *</Label>
              <Input id="title" placeholder="Will [event] happen by [date]?"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={getFieldRec("title") ? "border-yellow-400/50 dark:border-yellow-500/50" : ""} />
            </div>
          </FieldWrapper>
        )}

        {show("description") && (
          <FieldWrapper field="description">
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs">Description *</Label>
              <Textarea id="description" placeholder="Provide context about the market..."
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`resize-none ${getFieldRec("description") ? "border-yellow-400/50 dark:border-yellow-500/50" : ""}`} rows={2} />
            </div>
          </FieldWrapper>
        )}

        {show("category") && (
          <div className="space-y-1.5">
            <Label className="text-xs">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {show("outcomes") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Outcomes *</Label>
              <span className="text-[10px] text-muted-foreground">{outcomes.length}/10</span>
            </div>
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <Input placeholder={`Outcome ${index + 1}`} value={outcome}
                  onChange={(e) => updateOutcome(index, e.target.value)} className="h-9" />
                {outcomes.length > 2 && (
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeOutcome(index)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            ))}
            {outcomes.length < 10 && (
              <Button type="button" variant="outline" size="sm" className="w-full h-8 text-xs" onClick={addOutcome}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Outcome
              </Button>
            )}
          </div>
        )}

        {show("endDate") && (
          <div className="space-y-1.5">
            <Label htmlFor="endDate" className="text-xs">End Date *</Label>
            <Input id="endDate" type="date" value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
          </div>
        )}

        {show("resolutionCriteria") && (
          <FieldWrapper field="resolutionCriteria">
            <div className="space-y-1.5">
              <Label htmlFor="resolutionCriteria" className="text-xs">Resolution Criteria *</Label>
              <Textarea id="resolutionCriteria" placeholder="How will this market be resolved..."
                value={formData.resolutionCriteria} onChange={(e) => setFormData({...formData, resolutionCriteria: e.target.value})}
                className={`resize-none ${getFieldRec("resolutionCriteria") ? "border-yellow-400/50 dark:border-yellow-500/50" : ""}`} rows={2} />
            </div>
          </FieldWrapper>
        )}

        {show("resolutionSource") && (
          <FieldWrapper field="resolutionSource">
            <div className="space-y-1.5">
              <Label htmlFor="resolutionSource" className="text-xs">Resolution Source</Label>
              <Input id="resolutionSource" placeholder="e.g., Reuters, Official announcement..."
                value={formData.resolutionSource} onChange={(e) => setFormData({...formData, resolutionSource: e.target.value})}
                className={getFieldRec("resolutionSource") ? "border-blue-400/50 dark:border-blue-500/50" : ""} />
            </div>
          </FieldWrapper>
        )}
      </div>
    );
  };

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Market Live!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Your market is live! It will appear in the feed shortly.
          </p>
          <Button onClick={handleClose} className="mt-4">Done</Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return <FormFields />;

      case 2:
        return (
          <div className="space-y-4 py-2">
            {isChecking ? (
              <div className="py-10 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <Sparkles className="h-8 w-8 text-primary absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">Reviewing your market...</p>
              </div>
            ) : (
              <>
                <ScoreRing score={aiScore} />
                <p className="text-center text-sm text-muted-foreground">
                  {aiScore >= 8 ? "Looking great!" : aiScore >= 5 ? "Some improvements suggested" : "Needs work"}
                </p>
                <div className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                      rec.type === "success" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                      rec.type === "warning" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" :
                      "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    }`}>
                      {rec.type === "success" ? <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" /> :
                       rec.type === "warning" ? <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> :
                       <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
                      {rec.message}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              Fix the highlighted fields below, then re-check.
            </div>
            <FormFields showOnlyFlagged />
            <Button variant="outline" size="sm" className="w-full" onClick={() => { runAICheck(); }}
              disabled={isChecking}>
              {isChecking ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Checking...</>
                : <><RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Re-check with AI</>}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step === 2 && !hasIssues) {
      handleSubmit(); // No issues — post directly
    } else if (step === 2) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Button size="lg"
        className="fixed bottom-28 right-4 md:bottom-8 md:right-6 h-14 w-14 rounded-full shadow-lg gap-0 z-40"
        onClick={() => setOpen(true)}>
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {!submitted && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base">Create a Market</DialogTitle>
              </DialogHeader>

              {/* Step indicator with labels */}
              <div className="flex items-center gap-1 pt-1">
                {stepLabels.map((label, i) => {
                  const s = i + 1;
                  const active = s === step;
                  const done = s < step;
                  return (
                    <div key={s} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`h-1 w-full rounded-full transition-colors ${
                        done ? "bg-primary" : active ? "bg-primary" : "bg-muted"
                      }`} />
                      <span className={`text-[10px] transition-colors ${
                        active ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="py-1">
            {renderStep()}

            {!submitted && (
              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" size="sm"
                  onClick={() => step > 1 ? handleBack() : handleClose()}>
                  {step > 1 ? <><ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Back</> : "Cancel"}
                </Button>

                {step < 3 ? (
                  <Button size="sm" onClick={handleNext}
                    disabled={step === 1 ? !canProceedStep1 : isChecking}>
                    {step === 2 && isChecking ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Reviewing...</>
                      : step === 2 && !hasIssues && !isChecking ? "Post Market" : "Next"}
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting
                      ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Posting...</>
                      : "Post Market"}
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
