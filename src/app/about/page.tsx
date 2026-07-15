"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlueprintModal } from "@/components/modals/BlueprintModal";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Eye, Target, Compass, Award } from "lucide-react";

export default function AboutPage() {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  const triggerBlueprint = () => {
    setIsBlueprintOpen(true);
  };

  const values = [
    {
      title: "Outcome Over Output",
      desc: "Traditional development measures lines of code. We measure time saved, error rates eliminated, and pipeline conversion speed.",
      icon: <Target className="h-6 w-6 text-primary" />,
    },
    {
      title: "Systemic Integrity",
      desc: "We refuse to build disconnected silos or duct-tape APIs. All databases must sync natively, sharing a single source of truth.",
      icon: <Compass className="h-6 w-6 text-teal-600" />,
    },
    {
      title: "Client Autonomy",
      desc: "We believe you should own your business infrastructure. We provide subscription options or perpetual license transfers so you own the IP.",
      icon: <Award className="h-6 w-6 text-indigo-600" />,
    },
  ];

  const team = [
    {
      role: "Operations Audit & Research",
      focus: "Workflow Shadowing & Bottleneck Location",
      desc: "Our research leads study administrative processes, document file trails, and isolate manual tasks draining margin.",
    },
    {
      role: "Systems Architecture",
      focus: "Ecosystem Mapping & Database Modeling",
      desc: "Our architects map the flow pathways from web interfaces to CRMs, billing systems, and live BI dashboards.",
    },
    {
      role: "Automation & AI Engineering",
      focus: "API Integrations & Heuristic Flows",
      desc: "Our developers construct automated trigger pipelines, natural language AI responses, and clean internal portal UIs.",
    },
  ];

  return (
    <>
      <Navbar onBlueprintClick={triggerBlueprint} />

      <main className="flex-grow pt-32 pb-20 bg-neutral-bg">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-tint border border-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Philosophy</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary max-w-2xl leading-tight">
              We Solve Business Problems, Not Code Tickets.
            </h1>
            <p className="text-base md:text-lg text-neutral-muted max-w-xl">
              HeyGrow exists to unify operations. We diagnose blockages, build custom systems, and scale businesses through connected software.
            </p>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="p-8 bg-white" hoverEffect={false}>
              <h2 className="font-display text-xl font-bold text-secondary mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Our Mission
              </h2>
              <p className="text-sm md:text-base text-neutral-muted leading-relaxed">
                To unlock the hidden, untapped potential within every business by engineering connected operations systems. Technology is only the tool. Growth is the outcome.
              </p>
            </Card>
            
            <Card className="p-8 bg-white" hoverEffect={false}>
              <h2 className="font-display text-xl font-bold text-secondary mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-teal-600" /> Our Vision
              </h2>
              <p className="text-sm md:text-base text-neutral-muted leading-relaxed">
                A world where business leaders are freed from administrative clutter, manual data entry, and broken software silos—allowing teams to focus on strategy and value creation.
              </p>
            </Card>
          </div>

          {/* Values Matrix */}
          <div className="mb-20">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-primary text-center mb-10">
              Core Operating Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {values.map((val) => (
                <div key={val.title} className="flex flex-col gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-premium">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-sm md:text-base font-bold text-secondary mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-muted leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typographic Meet the Team Section */}
          <div className="mb-20">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-primary text-center mb-10">
              Operations & Systems Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((t) => (
                <Card key={t.role} className="p-6 bg-white hover:border-slate-300" hoverEffect={true}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                    {t.focus}
                  </span>
                  <h4 className="font-display text-base font-bold text-secondary mb-3">
                    {t.role}
                  </h4>
                  <p className="text-xs text-neutral-muted leading-relaxed">
                    {t.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-secondary text-white rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-tint">
              Onboarding Diagnostic
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight max-w-md">
              Ready to find your hidden potential?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-sm">
              Request a free blueprint study. We will map your operational paths and deliver a customized integrations plan.
            </p>
            <Button
              variant="primary"
              onClick={triggerBlueprint}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="shadow-glow"
            >
              Get Free Blueprint
            </Button>
          </div>

        </div>
      </main>

      <BlueprintModal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)} />
      <Footer />
    </>
  );
}
