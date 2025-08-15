import { useState, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SendHorizonal } from "lucide-react";

export type FactCheckFormValues = { claim: string; detailed: boolean };

type Props = {
  onSubmit: (values: FactCheckFormValues) => void;
  isLoading?: boolean;
};

export const FactCheckForm = ({ onSubmit, isLoading }: Props) => {
  const [claim, setClaim] = useState("");
  const [detailed, setDetailed] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;
    onSubmit({ claim: claim.trim(), detailed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Fact check form">
      <div className="space-y-3">
        <Label htmlFor="claim" className="text-base font-semibold text-foreground">Enter a claim to verify</Label>
        <Textarea
          id="claim"
          placeholder="e.g., The Great Barrier Reef has lost over 50% of its coral since 1995."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          rows={4}
          className="resize-none border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm transition-all duration-300"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
          <Switch id="detailed" checked={detailed} onCheckedChange={setDetailed} />
          <Label htmlFor="detailed" className="font-medium text-foreground cursor-pointer">Detailed analysis</Label>
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !claim.trim()} 
          className="hover-scale bg-hero hover:shadow-[var(--shadow-glow)] transition-all duration-300 px-6 py-3 h-auto font-semibold"
        >
          <SendHorizonal className="mr-2 h-4 w-4" />
          {isLoading ? "Analyzing..." : "Analyze Claim"}
        </Button>
      </div>
    </form>
  );
};

export default FactCheckForm;
