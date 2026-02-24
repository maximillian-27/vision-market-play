import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Check, AlertCircle, Lightbulb, Loader2, X, ArrowLeft, ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
  "Crypto", "Politics", "Sports", "Finance", "Technology", "Entertainment", "Science",
];

interface AIFeedback {
  type: "required" | "suggested";
  field: string;
  message: string;
}

type FlowState = "form" | "checking" | "feedback" | "posting" | "done";

function FieldFeedback({ feedback }: { feedback?: AIFeedback }) {
  if (!feedback) return null;
  const isRequired = feedback.type === "required";
  return (
    <div className={`flex items-start gap-2 mt-1.5 p-2 rounded-lg text-xs ${
      isRequired
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    }`}>
      {isRequired ? (
        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
      ) : (
        <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0" />
      )}
      <span>{feedback.message}</span>
    </div>
  );
}

export function CreateMarketButton() {
  const [open, setOpen] = useState(false);
  const [flowState, setFlowState] = useState<FlowState>("form");
  const [aiFeedback, setAiFeedback] = useState<AIFeedback[]>([]);
  const [aiScore, setAiScore] = useState(0);
  const [outcomes, setOutcomes] = useState<string[]>(["Yes", "No"]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    endDate: "",
    resolutionCriteria: "",
    resolutionSource: "",
  });

  const hasRequired = aiFeedback.some(f => f.type === "required");
  const isGreenLight = aiScore >= 8 && !hasRequired;

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

  const canCheck =
    formData.title && formData.description && formData.category &&
    formData.endDate && formData.resolutionCriteria &&
    outcomes.filter(o => o.trim()).length >= 2;

  const getFeedbackForField = (field: string) =>
    aiFeedback.find(f => f.field === field);

  const getFieldHighlight = (field: string) => {
    const fb = getFeedbackForField(field);
    if (!fb) return "";
    return fb.type === "required"
      ? "border-amber-400/50 focus-visible:ring-amber-400/30"
      : "border-blue-400/50 focus-visible:ring-blue-400/30";
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runAICheck = useCallback(async () => {
    setFlowState("checking");
    await new Promise(resolve => setTimeout(resolve, 2000));

    const recs: AIFeedback[] = [];
    let score = 10;

    if (formData.title.length < 20) {
      recs.push({ type: "suggested", field: "title", message: "Make your question more specific for better engagement." });
      score -= 1;
    }
    if (!formData.resolutionCriteria || formData.resolutionCriteria.length < 30) {
      recs.push({ type: "required", field: "resolutionCriteria", message: "Add more detailed resolution criteria to avoid disputes." });
      score -= 2;
    }
    if (!formData.resolutionSource) {
      recs.push({ type: "suggested", field: "resolutionSource", message: "Add a trusted source for resolution verification." });
      score -= 1;
    }
    if (formData.description.length < 30) {
      recs.push({ type: "suggested", field: "description", message: "A longer description helps players understand the market better." });
      score -= 1;
    }

    setAiScore(Math.max(score, 1));
    setAiFeedback(recs);
    setFlowState("feedback");
  }, [formData]);

  const handlePost = async () => {
    setFlowState("posting");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFlowState("done");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setFlowState("form");
      setAiFeedback([]);
      setAiScore(0);
      setOutcomes(["Yes", "No"]);
      setCoverImage(null);
      setFormData({ title: "", description: "", category: "", endDate: "", resolutionCriteria: "", resolutionSource: "" });
    }, 300);
  };

  const scoreColor = aiScore >= 8 ? "text-success" : aiScore >= 5 ? "text-amber-500" : "text-destructive";

  return (
    <>
      <button
        className="fixed bottom-28 right-4 md:bottom-8 md:right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-[0_2px_12px_hsl(var(--primary)/0.35)] hover:shadow-[0_4px_20px_hsl(var(--primary)/0.45)] hover:scale-105 active:scale-95 transition-all duration-200 z-40 flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 [&>button]:hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border/40">
            <button
              onClick={() => {
                if (flowState === "feedback") setFlowState("form");
                else handleClose();
              }}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">
              {flowState === "done" ? "Market Created" : "Create Market"}
            </h2>
          </div>

          {/* Done state */}
          {flowState === "done" && (
            <div className="py-12 text-center space-y-4 px-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold">Market Live!</h3>
              <p className="text-sm text-muted-foreground">
                Your market is now live and will appear in the feed.
              </p>
              <Button onClick={handleClose} className="mt-2">Done</Button>
            </div>
          )}

          {/* Form + AI feedback inline */}
          {flowState !== "done" && (
            <div className="p-5 space-y-4">
              {/* Score badge (shown after check) */}
              {flowState === "feedback" && (
                <div className={`flex items-center justify-between p-3 rounded-xl ${
                  isGreenLight ? "bg-success/10 border border-success/20" : "bg-amber-500/10 border border-amber-500/20"
                }`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className={`h-4 w-4 ${isGreenLight ? "text-success" : "text-amber-500"}`} />
                    <span className="text-sm font-medium">
                      {isGreenLight ? "Ready to post!" : hasRequired ? "Required changes below" : "Suggestions below"}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${scoreColor}`}>{aiScore}/10</span>
                </div>
              )}

              {/* Form fields with inline feedback */}
              <div className="space-y-3">
                {/* Cover Photo */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Cover Photo</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {coverImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-border/40">
                      <img src={coverImage} alt="Cover" className="w-full h-32 object-cover" />
                      <button
                        onClick={() => setCoverImage(null)}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <ImagePlus className="h-5 w-5" />
                      <span className="text-xs">Add cover photo</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-xs">Question *</Label>
                  <Input
                    id="title"
                    placeholder="Will [event] happen by [date]?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={getFieldHighlight("title")}
                  />
                  {flowState === "feedback" && <FieldFeedback feedback={getFeedbackForField("title")} />}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-xs">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide context about the market..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`resize-none ${getFieldHighlight("description")}`}
                    rows={2}
                  />
                  {flowState === "feedback" && <FieldFeedback feedback={getFeedbackForField("description")} />}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="endDate" className="text-xs">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Outcomes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Outcomes *</Label>
                    <span className="text-[10px] text-muted-foreground">{outcomes.length}/10</span>
                  </div>
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <Input
                        placeholder={`Outcome ${index + 1}`}
                        value={outcome}
                        onChange={(e) => updateOutcome(index, e.target.value)}
                        className="h-9"
                      />
                      {outcomes.length > 2 && (
                        <Button
                          type="button" variant="ghost" size="icon"
                          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeOutcome(index)}
                        >
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

                <div className="space-y-1.5">
                  <Label htmlFor="resolutionCriteria" className="text-xs">Resolution Criteria *</Label>
                  <Textarea
                    id="resolutionCriteria"
                    placeholder="How will this market be resolved..."
                    value={formData.resolutionCriteria}
                    onChange={(e) => setFormData({ ...formData, resolutionCriteria: e.target.value })}
                    className={`resize-none ${getFieldHighlight("resolutionCriteria")}`}
                    rows={2}
                  />
                  {flowState === "feedback" && <FieldFeedback feedback={getFeedbackForField("resolutionCriteria")} />}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="resolutionSource" className="text-xs">Resolution Source</Label>
                  <Input
                    id="resolutionSource"
                    placeholder="e.g., Reuters, Official announcement..."
                    value={formData.resolutionSource}
                    onChange={(e) => setFormData({ ...formData, resolutionSource: e.target.value })}
                    className={getFieldHighlight("resolutionSource")}
                  />
                  {flowState === "feedback" && <FieldFeedback feedback={getFeedbackForField("resolutionSource")} />}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2">
                {flowState === "checking" ? (
                  <Button className="w-full gap-2" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI is reviewing...
                  </Button>
                ) : flowState === "feedback" && isGreenLight ? (
                  <Button className="w-full gap-2" onClick={handlePost}>
                    <Check className="h-4 w-4" /> Post Market
                  </Button>
                ) : flowState === "posting" ? (
                  <Button className="w-full gap-2" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" /> Posting...
                  </Button>
                ) : flowState === "feedback" && hasRequired ? (
                  <Button className="w-full gap-2" onClick={runAICheck}>
                    <Sparkles className="h-4 w-4" />
                    Re-check with AI
                  </Button>
                ) : flowState === "feedback" ? (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2" onClick={runAICheck}>
                      <Sparkles className="h-4 w-4" />
                      Re-check
                    </Button>
                    <Button className="flex-1 gap-2" onClick={handlePost}>
                      Post Market
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full gap-2" onClick={runAICheck} disabled={!canCheck}>
                    <Sparkles className="h-4 w-4" />
                    Check with AI
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
