import { Target, Shield, Globe2 } from "lucide-react";

export const Mission = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-hero flex items-center justify-center glow-primary">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-hero bg-clip-text text-transparent">
              Our Mission
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 max-w-3xl mx-auto">
              In an era of information abundance and digital misinformation, we stand as guardians of truth. 
              Our mission is to empower individuals, journalists, and organizations with AI-powered fact-checking 
              tools that combat false narratives and promote evidence-based understanding.
            </p>
            
            <p className="text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              We believe that access to verified, reliable information is fundamental to democracy, informed decision-making, 
              and social progress. Through cutting-edge technology and partnerships with trusted news sources, 
              we're building a more informed world, one fact at a time.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <span className="text-muted-foreground">Truth Protection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe2 className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Global Impact</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-accent" />
              </div>
              <span className="text-muted-foreground">Precision Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;