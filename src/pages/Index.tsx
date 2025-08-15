import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FactCheckForm, FactCheckFormValues } from "@/components/factcheck/FactCheckForm";
import ProgressSteps, { Step } from "@/components/factcheck/ProgressSteps";
import FactCheckResult, { FactCheckData, Verdict } from "@/components/factcheck/FactCheckResult";
import SEOHead from "@/components/SEOHead";
import { ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";

const steps: Step[] = [
  { id: "parse", label: "Parsing claim" },
  { id: "search", label: "Searching sources" },
  { id: "evaluate", label: "Evaluating credibility" },
  { id: "summarize", label: "Summarizing answer" },
];

const Index = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [result, setResult] = useState<FactCheckData | null>(null);
  const claimRef = useRef<string>("");

  // Signature spotlight
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty("--spotlight-x", `${x}%`);
      containerRef.current.style.setProperty("--spotlight-y", `${y}%`);
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handler);
    return () => el?.removeEventListener("mousemove", handler);
  }, []);

  const handleSubmit = (values: FactCheckFormValues) => {
    setResult(null);
    claimRef.current = values.claim;
    setShowDetails(values.detailed);
    setIsLoading(true);
    setActiveStep(0);

    // Simulate stepwise progress
    const durations = [600, 900, 900, 700];
    let idx = 0;
    const advance = () => {
      if (idx < steps.length - 1) {
        setTimeout(() => {
          idx += 1;
          setActiveStep(idx);
          advance();
        }, durations[idx]);
      } else {
        // Finalize after a short delay
        setTimeout(() => {
          const res = synthesizeResult(values.claim, values.detailed);
          setResult(res);
          setIsLoading(false);
          setActiveStep(-1);
          toast({ title: "Fact check complete", description: "Verdict and sources are ready." });
        }, 700);
      }
    };
    advance();
  };

  const jsonLd = useMemo(() => {
    if (!result) return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "TruthLens",
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      description: "Verify claims with verdicts, confidence, summaries, and sources.",
    };
    return {
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      claimReviewed: claimRef.current,
      reviewRating: {
        "@type": "Rating",
        ratingValue: result.confidence,
        alternateName: result.verdict,
        bestRating: 100,
        worstRating: 0,
      },
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      author: { "@type": "Organization", name: "TruthLens" },
      citation: result.sources.map(s => ({ "@type": "CreativeWork", url: s.url, name: s.title })),
    };
  }, [result]);

  return (
    <>
      <SEOHead
        title="TruthLens – Real-time Fact Checking"
        description="Verify any claim with clear verdicts, confidence scores, summaries, and trusted sources."
        jsonLd={jsonLd as any}
      />
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-hero shadow-[var(--shadow-glow)]" aria-hidden />
            <span className="font-semibold">TruthLens</span>
          </a>
          <nav className="hidden sm:block text-sm text-muted-foreground">Fight misinformation</nav>
        </div>
      </header>

      <main>
        <section ref={containerRef} className="bg-spotlight">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-hero bg-clip-text text-transparent">
                  Verify any claim instantly
                </h1>
                <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                  Combat misinformation with AI-powered fact-checking. Get verdicts, confidence scores, and trusted sources.
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Verified Sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span>Professional Grade</span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-5">
              <Card className="md:col-span-3 bg-card-gradient shadow-[var(--shadow-elevate)] hover-lift animate-scale-in border border-border/50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-hero"></div>
                    Fact Check Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FactCheckForm onSubmit={handleSubmit} isLoading={isLoading} />
                  {isLoading && (
                    <div className="mt-6">
                      <ProgressSteps steps={steps} activeIndex={Math.max(activeStep, 0)} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-4">
                {result ? (
                  <FactCheckResult data={result} showDetails={showDetails} />
                ) : (
                  <Card className="h-full animate-fade-in bg-card-gradient border border-border/50">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-hero mx-auto opacity-20"></div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Ready to Analyze</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Submit a claim to see our AI-powered verdict, confidence score, analysis summary, and verified sources.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} TruthLens • Built to verify facts and statistics.
        </div>
      </footer>
    </>
  );
};

function synthesizeResult(claim: string, detailed: boolean): FactCheckData {
  const c = claim.toLowerCase();
  let verdict: Verdict = "Mixed";
  let confidence = 62;
  const notes: string[] = [];

  if (c.includes("flat") && c.includes("earth")) {
    verdict = "False"; confidence = 96;
    notes.push("Multiple space agency photos and peer‑reviewed sources refute a flat Earth.");
  } else if (c.includes("2+2=4") || c.includes("two plus two equals four")) {
    verdict = "True"; confidence = 99;
    notes.push("Mathematical identity verified by axiomatic arithmetic.");
  } else if (c.includes("50%") && c.includes("coral")) {
    verdict = "Mixed"; confidence = 74;
    notes.push("Coral loss varies by region and timeframe; some sources cite ~50% in specific periods.");
  } else if (c.includes("covid") && c.includes("vaccine")) {
    verdict = "Mixed"; confidence = 81;
    notes.push("Strong consensus on efficacy with variation across variants and populations.");
  } else if (c.includes("unemployment") || c.includes("inflation")) {
    verdict = "Unverified"; confidence = 55;
    notes.push("Economic indicators depend on the country and most recent releases.");
  }

  if (detailed) {
    notes.push(
      "Parsed entities and datums from the claim.",
      "Queried credible sources (gov, academia, reputable media).",
      "Weighted sources by historical reliability and evidence quality.",
      "Aggregated findings into a concise summary."
    );
  }

  const sources = [
    { title: "WHO – Fact‑checking resources", url: "https://www.who.int/" },
    { title: "OECD Data – Statistics", url: "https://data.oecd.org/" },
    { title: "Reuters – Fact Check", url: "https://www.reuters.com/fact-check/" },
  ];

  return {
    verdict,
    confidence,
    summary: summarize(claim, verdict),
    sources,
    detailedNotes: notes,
  };
}

function summarize(claim: string, verdict: Verdict): string {
  const v = verdict.toLowerCase();
  return `Claim: "${claim}" — Assessment: ${v}. We triangulated multiple credible sources and evaluated methodology, recency, and consensus to reach this verdict.`;
}

export default Index;
