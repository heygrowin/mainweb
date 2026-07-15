"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, BookOpen, Compass, Code, Rocket, BarChart3, 
  ArrowRight, ShieldCheck, HeartHandshake, Eye 
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Step {
  num: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  outcome: string;
}

export const HowWeWork: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      num: "01",
      name: "Research",
      shortDesc: "Shadow operational staff & track document trails.",
      longDesc: "We spend time detailing your current workflows. We audit current software settings, compile lists of spreadsheets, trace how client leads pass between departments, and isolate duplicate tasks.",
      icon: <Search className="h-6 w-6 text-primary" />,
      outcome: "Detailed manual operations audit log.",
    },
    {
      num: "02",
      name: "Understand",
      shortDesc: "Isolate precise bottlenecks draining margin.",
      longDesc: "We map operational drag points. Whether it's leads falling through unmonitored emails, staff copying invoices across calendars manually, or a total lack of cash flow analytics.",
      icon: <BookOpen className="h-6 w-6 text-teal-600" />,
      outcome: "Quantified bottlenecks sheet with time-loss scores.",
    },
    {
      num: "03",
      name: "Design",
      shortDesc: "Architect a custom Growth Blueprint.",
      longDesc: "We map out a connected software and automation schematic. This shows exactly how inputs flow from your website to a CRM, trigger database records, raise billing, and update BI dashboards.",
      icon: <Compass className="h-6 w-6 text-indigo-600" />,
      outcome: "Unified operations flow chart and database model.",
    },
    {
      num: "04",
      name: "Build",
      shortDesc: "Engine custom code & automation routines.",
      longDesc: "We develop customized CRMs, portals, and AI agents. We link APIs natively, construct database record structures, configure automatic transactional workflows, and style clean dashboard UIs.",
      icon: <Code className="h-6 w-6 text-blue-600" />,
      outcome: "Fully integrated operational software stack.",
    },
    {
      num: "05",
      name: "Launch",
      shortDesc: "Seamless migrations with zero disruption.",
      longDesc: "We run rigorous data transfer validations, configure custom domain routings, test security permissions, and guide your administrative teams through onboarding orientations.",
      icon: <Rocket className="h-6 w-6 text-rose-500" />,
      outcome: "Go-live deployment with zero operations downtime.",
    },
    {
      num: "06",
      name: "Improve",
      shortDesc: "Weekly optimizations based on analytics.",
      longDesc: "A business is a living system. We audit performance databases weekly, refine AI reply contexts, optimize database queries, and continuously build solutions for new frictions.",
      icon: <BarChart3 className="h-6 w-6 text-emerald-600" />,
      outcome: "Continuous performance tuning with monthly briefs.",
    },
  ];

  return (
    <section id="how-we-work" className="py-24 bg-neutral-bg border-t border-slate-100 relative">
      {/* Background Accent */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-primary">
            Our Methodology
          </h2>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary max-w-2xl leading-tight">
            Engineered for Continuous Velocity.
          </p>
          <p className="text-base md:text-lg text-neutral-muted max-w-xl">
            We don't build and walk away. We study, architect, launch, and continuously optimize systems that power your growth.
          </p>
        </div>

        {/* Timeline selector */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200/60 pb-6 mb-12 gap-y-4">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                activeStep === idx
                  ? "bg-primary text-white border-primary shadow-premium"
                  : "bg-white border-slate-100 text-neutral-muted hover:bg-slate-50"
              }`}
            >
              <span className="font-display text-xs font-bold font-mono">
                {step.num}
              </span>
              <span className="text-sm font-semibold">
                {step.name}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Step details card display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 hover:border-slate-200">
              
              {/* Icon / Title panel */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <span className="font-display text-sm font-bold font-mono text-primary">
                    Step {steps[activeStep].num}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-secondary mt-1">
                    {steps[activeStep].name}
                  </h3>
                </div>
                <p className="text-sm md:text-base font-semibold text-secondary leading-relaxed">
                  {steps[activeStep].shortDesc}
                </p>
              </div>

              {/* Description & outcome panel */}
              <div className="lg:col-span-8 flex flex-col gap-6 lg:border-l lg:border-slate-100 lg:pl-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-muted mb-2">
                    Process Breakdown
                  </h4>
                  <p className="text-sm md:text-base text-neutral-muted leading-relaxed">
                    {steps[activeStep].longDesc}
                  </p>
                </div>

                <div className="bg-emerald-50/50 border border-primary/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted block">
                        Core Output Outcome
                      </span>
                      <span className="text-xs md:text-sm font-bold text-secondary">
                        {steps[activeStep].outcome}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    Verified <HeartHandshake className="h-4 w-4" />
                  </span>
                </div>
              </div>

            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
