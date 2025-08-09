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
      return <Badge className="bg-primary text-primary-foreground">True</Badge>;
    case "False":
      return <Badge className="bg-destructive text-destructive-foreground">False</Badge>;
    case "Mixed":
      return <Badge className="bg-accent text-accent-foreground">Mixed</Badge>;
    default:
      return <Badge variant="secondary">Unverified</Badge>;
  }
};

const verdictIcon = (v: Verdict) => {
  switch (v) {
    case "True":
      return <ShieldCheck className="h-5 w-5 text-primary" />;
    case "False":
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case "Mixed":
      return <HelpCircle className="h-5 w-5 text-accent" />;
    default:
      return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
  }
};

type Props = { data: FactCheckData; showDetails?: boolean };

export const FactCheckResult = ({ data, showDetails }: Props) => {
  return (
    <Card className="shadow-sm animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {verdictIcon(data.verdict)}
          <span>Verdict:</span> {verdictBadge(data.verdict)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section aria-labelledby="confidence" className="space-y-2">
          <h3 id="confidence" className="text-sm font-medium text-muted-foreground">Confidence</h3>
          <div className="flex items-center gap-3">
            <Progress value={data.confidence} className="h-2" />
            <span className="text-sm font-semibold">{Math.round(data.confidence)}%</span>
          </div>
        </section>

        <section aria-labelledby="summary" className="space-y-2">
          <h3 id="summary" className="text-sm font-medium text-muted-foreground">Summary</h3>
          <p className="leading-relaxed">{data.summary}</p>
        </section>

        <section aria-labelledby="sources" className="space-y-3">
          <h3 id="sources" className="text-sm font-medium text-muted-foreground">Sources</h3>
          <ul className="space-y-2">
            {data.sources.map((s, idx) => (
              <li key={idx}>
                <a href={s.url} target="_blank" rel="noopener" className="story-link inline-flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {showDetails && data.detailedNotes && data.detailedNotes.length > 0 && (
          <section aria-labelledby="details" className="space-y-2">
            <h3 id="details" className="text-sm font-medium text-muted-foreground">Detailed analysis</h3>
            <ul className="list-disc pl-6 space-y-1">
              {data.detailedNotes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default FactCheckResult;
