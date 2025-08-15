const sources = [
  { name: "Reuters", brand: "R", color: "bg-blue-600 text-white", type: "International" },
  { name: "Associated Press", brand: "AP", color: "bg-red-600 text-white", type: "News Agency" },
  { name: "BBC News", brand: "BBC", color: "bg-red-700 text-white", type: "Broadcasting" },
  { name: "CNN", brand: "CNN", color: "bg-red-600 text-white", type: "Television" },
  { name: "The Guardian", brand: "G", color: "bg-blue-900 text-white", type: "Daily" },
  { name: "Wall Street Journal", brand: "WSJ", color: "bg-gray-900 text-white", type: "Finance" },
  { name: "NPR", brand: "NPR", color: "bg-gray-800 text-white", type: "Public Radio" },
  { name: "PBS NewsHour", brand: "PBS", color: "bg-blue-700 text-white", type: "Public TV" },
  { name: "TIME", brand: "TIME", color: "bg-red-600 text-white", type: "Magazine" },
  { name: "The Economist", brand: "E", color: "bg-red-700 text-white", type: "Weekly" },
  { name: "Financial Times", brand: "FT", color: "bg-pink-600 text-white", type: "Business" },
  { name: "New York Times", brand: "T", color: "bg-gray-900 text-white", type: "Daily" },
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
            {infiniteSources.map((source, index) => (
              <div
                key={`${source.name}-${index}`}
                className="flex items-center gap-4 bg-card-gradient border border-border/30 rounded-lg px-6 py-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 min-w-[280px] group hover-lift"
              >
                <div className={`w-12 h-12 rounded-lg ${source.color} flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                  {source.brand}
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
            ))}
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