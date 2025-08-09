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
    <ol className={cn("grid grid-cols-1 gap-3 sm:grid-cols-4", className)} aria-label="Progress">
      {steps.map((s, i) => {
        const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
        return (
          <li key={s.id} className={"flex items-center gap-3 animate-fade-in"}>
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium",
                state === "done" && "bg-primary text-primary-foreground border-transparent shadow-sm",
                state === "active" && "bg-secondary text-secondary-foreground border-transparent",
                state === "todo" && "bg-background text-muted-foreground"
              )}
              aria-current={state === "active" ? "step" : undefined}
            >
              {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span className={cn("text-sm", state === "todo" && "text-muted-foreground")}>{s.label}</span>
            {state === "active" && <Loader2 className="ml-auto h-4 w-4 animate-spin text-primary" />}
          </li>
        );
      })}
    </ol>
  );
};

export default ProgressSteps;
