"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { DiagnosticScore } from "@/components/sections/DiagnosticScore";
import { BlueprintModal } from "@/components/modals/BlueprintModal";
import { 
  Building, Gem, Truck, HeartPulse, GraduationCap, Plane, 
  HardHat, Utensils, Calendar, ArrowUpRight, Sparkles 
} from "lucide-react";
import { getIndustries, IndustryData } from "@/lib/dataService";

export default function IndustriesHubPage() {
  const [industries, setIndustries] = useState<IndustryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [initialBottleneck, setInitialBottleneck] = useState("");

  useEffect(() => {
    const loadIndustries = async () => {
      const data = await getIndustries();
      setIndustries(data);
      setLoading(false);
    };
    loadIndustries();
  }, []);

  const triggerBlueprint = (bottleneckVal = "") => {
    setInitialBottleneck(bottleneckVal);
    setIsBlueprintOpen(true);
  };

  const handleDiagnosticSubmit = (score: number, answers: string[]) => {
    let bottleneckVal = "other";
    if (answers.includes("leads-chasing")) bottleneckVal = "lost-leads";
    else if (answers.includes("manual-entry")) bottleneckVal = "manual-work";
    else if (answers.includes("invoicing")) bottleneckVal = "manual-work";
    else if (answers.includes("7-plus-tools")) bottleneckVal = "no-integrations";
    
    triggerBlueprint(bottleneckVal);
  };

  const getIcon = (key: string, className = "h-5 w-5") => {
    const map: Record<string, React.ReactNode> = {
      Building: <Building className={`${className} text-primary`} />,
      Gem: <Gem className={`${className} text-teal-600`} />,
      Truck: <Truck className={`${className} text-blue-600`} />,
      HeartPulse: <HeartPulse className={`${className} text-rose-500`} />,
      GraduationCap: <GraduationCap className={`${className} text-indigo-600`} />,
      Plane: <Plane className={`${className} text-cyan-600`} />,
      HardHat: <HardHat className={`${className} text-amber-600`} />,
      Utensils: <Utensils className={`${className} text-orange-600`} />,
      Calendar: <Calendar className={`${className} text-purple-600`} />,
    };
    return map[key] || <Building className={`${className} text-primary`} />;
  };

  return (
    <>
      <Navbar onBlueprintClick={() => triggerBlueprint()} />
      
      <main className="flex-grow pt-32 pb-20 bg-neutral-bg">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col items-start gap-4 mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-tint border border-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Diagnostic Industry Flow</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary leading-tight">
              Business Growth Blueprints
            </h1>
            
            <p className="text-sm md:text-base text-neutral-muted max-w-xl">
              Select your sector to examine the systems blueprint. Redefine manual process silos with unified system flows.
            </p>
          </div>

          {/* Grid Directory: Redesigned as clean, minimalist cards redirecting to Notion */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-slate-200/60 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
              {industries.map((ind) => (
                <div 
                  key={ind.slug} 
                  onClick={() => window.open(ind.notionUrl, "_blank", "noopener,noreferrer")} 
                  className="flex group w-full cursor-pointer"
                >
                  <Card
                    className="flex flex-col justify-between w-full p-6 hover:border-primary/40 relative overflow-hidden bg-white border border-slate-200"
                    hoverEffect={true}
                  >
                    <div className="absolute top-0 right-0 h-24 w-24 pointer-events-none opacity-20 filter blur-2xl rounded-full bg-gradient-to-tr from-primary to-teal-500" />
                    
                    <div>
                      {/* Header info */}
                      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-primary-tint group-hover:border-primary/20 transition-all duration-300">
                            {getIcon(ind.iconKey)}
                          </div>
                          <h3 className="font-display text-base font-bold text-secondary group-hover:text-primary transition-colors">
                            {ind.name}
                          </h3>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-neutral-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                      <p className="text-xs text-neutral-muted leading-relaxed mb-6 font-semibold">
                        {ind.desc}
                      </p>
                    </div>

                    {/* High visibility raw HTML Notion launch button */}
                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full text-xs py-2 bg-slate-950 hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider rounded-xl cursor-pointer text-white border-none shadow-premium"
                      >
                        <span className="font-display font-black text-xs mr-0.5">N</span>
                        Open Blueprint
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Connected Diagnostic calculator */}
          <div className="border-t border-slate-200 pt-16">
            <DiagnosticScore onBlueprintClick={handleDiagnosticSubmit} />
          </div>

        </div>
      </main>

      <BlueprintModal 
        isOpen={isBlueprintOpen} 
        onClose={() => setIsBlueprintOpen(false)} 
        initialBottleneck={initialBottleneck}
      />
      <Footer />
    </>
  );
}
