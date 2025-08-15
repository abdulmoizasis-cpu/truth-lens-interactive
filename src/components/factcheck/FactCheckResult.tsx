import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";

export type Source = { title: string; url: string };
export type Verdict = "True" | "False" | "Mixed" | "Unverified";

export interface FactCheckData {
  verdict: Verdict;
  confidence: number; // 0-100
  summary: string;
  sources: Source[];
  detailedNotes?: string[];
}

const verdictBadge = (v: Verdict) => {
  switch (v) {
    case "True":
      return <Badge className="bg-success text-success-foreground glow-success">True</Badge>;
    case "False":
      return <Badge className="bg-destructive text-destructive-foreground">False</Badge>;
    case "Mixed":
      return <Badge className="bg-warning text-warning-foreground glow-warning">Mixed</Badge>;
    default:
      return <Badge variant="secondary">Unverified</Badge>;
  }
};

const verdictIcon = (v: Verdict) => {
  switch (v) {
    case "True":
      return <ShieldCheck className="h-5 w-5 text-success" />;
    case "False":
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case "Mixed":
      return <HelpCircle className="h-5 w-5 text-warning" />;
    default:
      return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
  }
};

type Props = { data: FactCheckData; showDetails?: boolean };

export const FactCheckResult = ({ data, showDetails }: Props) => {
  return (
    <Card className="bg-card-gradient shadow-[var(--shadow-medium)] hover-lift animate-enter border border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          {verdictIcon(data.verdict)}
          <span className="text-muted-foreground font-medium">Verdict:</span> 
          {verdictBadge(data.verdict)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section aria-labelledby="confidence" className="space-y-3">
          <h3 id="confidence" className="text-sm font-semibold text-foreground uppercase tracking-wide">Confidence Score</h3>
          <div className="flex items-center gap-4">
            <Progress value={data.confidence} className="h-3 flex-1" />
            <span className="text-lg font-bold text-primary">{Math.round(data.confidence)}%</span>
          </div>
        </section>

        <section aria-labelledby="summary" className="space-y-3">
          <h3 id="summary" className="text-sm font-semibold text-foreground uppercase tracking-wide">Analysis Summary</h3>
          <p className="leading-relaxed text-foreground/90 bg-muted/30 p-4 rounded-lg border-l-4 border-primary">{data.summary}</p>
        </section>

        <section aria-labelledby="sources" className="space-y-4">
          <h3 id="sources" className="text-sm font-semibold text-foreground uppercase tracking-wide">Verified Sources</h3>
          <ul className="space-y-3">
            {data.sources.map((s, idx) => (
              <li key={idx} className="group">
                <a 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener" 
                  className="story-link inline-flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 w-full group-hover:shadow-[var(--shadow-soft)]"
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <span className="font-medium">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {showDetails && data.detailedNotes && data.detailedNotes.length > 0 && (
          <section aria-labelledby="details" className="space-y-4">
            <h3 id="details" className="text-sm font-semibold text-foreground uppercase tracking-wide">Detailed Analysis</h3>
            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              <ul className="space-y-3">
                {data.detailedNotes.map((n, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 leading-relaxed">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default FactCheckResult;
