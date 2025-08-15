import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  label: string;
};

type Props = {
  steps: Step[];
  activeIndex: number;
  className?: string;
};

export const ProgressSteps = ({ steps, activeIndex, className }: Props) => {
  return (
    <div className="bg-muted/20 p-4 rounded-lg border border-border/30">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Analysis Progress</h3>
      <ol className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)} aria-label="Progress">
        {steps.map((s, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
          return (
            <li key={s.id} className="flex items-center gap-3 animate-fade-in">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300",
                  state === "done" && "bg-success text-success-foreground border-transparent glow-success",
                  state === "active" && "bg-primary text-primary-foreground border-transparent glow-primary",
                  state === "todo" && "bg-background text-muted-foreground border-border"
                )}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn(
                "text-sm font-medium transition-colors duration-300",
                state === "active" && "text-primary",
                state === "done" && "text-success",
                state === "todo" && "text-muted-foreground"
              )}>
                {s.label}
              </span>
              {state === "active" && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin text-primary" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressSteps;
