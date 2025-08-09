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
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Fact check form">
      <div className="space-y-2">
        <Label htmlFor="claim" className="text-base">Enter a claim to verify</Label>
        <Textarea
          id="claim"
          placeholder="e.g., The Great Barrier Reef has lost over 50% of its coral since 1995."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch id="detailed" checked={detailed} onCheckedChange={setDetailed} />
          <Label htmlFor="detailed">Detailed analysis</Label>
        </div>
        <Button type="submit" disabled={isLoading} className="hover-scale">
          <SendHorizonal className="mr-2 h-4 w-4" />
          {isLoading ? "Checking..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default FactCheckForm;
