import { Globe, Newspaper, Radio, Tv, Building2, BookOpen } from "lucide-react";

const sources = [
  { name: "Reuters", icon: Globe, type: "International" },
  { name: "Associated Press", icon: Newspaper, type: "News Agency" },
  { name: "BBC News", icon: Radio, type: "Broadcasting" },
  { name: "CNN", icon: Tv, type: "Television" },
  { name: "The Guardian", icon: Newspaper, type: "Daily" },
  { name: "Wall Street Journal", icon: Building2, type: "Finance" },
  { name: "NPR", icon: Radio, type: "Public Radio" },
  { name: "PBS NewsHour", icon: Tv, type: "Public TV" },
  { name: "TIME", icon: BookOpen, type: "Magazine" },
  { name: "The Economist", icon: BookOpen, type: "Weekly" },
  { name: "Financial Times", icon: Building2, type: "Business" },
  { name: "New York Times", icon: Newspaper, type: "Daily" },
];

// Duplicate sources for seamless infinite scroll
const infiniteSources = [...sources, ...sources];

export const VerifiedSources = () => {
  return (
    <section className="py-12 bg-muted/10 border-t border-border/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Trusted by Top News Sources</h2>
          <p className="text-muted-foreground">
            Our fact-checking draws from the world's most reliable news organizations
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Sliding container */}
          <div className="flex gap-8 animate-[slide_30s_linear_infinite] hover:[animation-play-state:paused]">
            {infiniteSources.map((source, index) => {
              const IconComponent = source.icon;
              return (
                <div
                  key={`${source.name}-${index}`}
                  className="flex items-center gap-3 bg-card-gradient border border-border/30 rounded-lg px-6 py-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 min-w-[240px] group hover-lift"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {source.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {source.type}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            + Hundreds more trusted sources worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifiedSources;