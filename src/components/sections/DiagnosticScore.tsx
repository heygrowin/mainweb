"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DiagnosticProps {
  onBlueprintClick?: (diagnosticScore: number, answers: string[]) => void;
}

export const DiagnosticScore: React.FC<DiagnosticProps> = ({ onBlueprintClick }) => {
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3 (Result)
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);

  const questions = [
    {
      id: "time-waste",
      title: "How many hours does your team lose weekly to manual copy-pasting, sheet entries, or tool syncs?",
      options: [
        { label: "5–10 hours weekly (Minor profit leak)", score: 30, value: "minor-overhead" },
        { label: "10–20 hours weekly (Moderate system friction)", score: 15, value: "moderate-overhead" },
        { label: "20+ hours weekly (Critical operational loss)", score: 5, value: "manual-entry" },
      ],
    },
    {
      id: "leads-delay",
      title: "What is your average response time when a new prospect/lead submits an inquiry?",
      options: [
        { label: "Under 60 seconds (Auto-pilot conversion)", score: 30, value: "fast-response" },
        { label: "Within 1–4 hours (Significant lead drop risk)", score: 15, value: "medium-response" },
        { label: "Over 4 hours or next morning (75%+ lead conversion loss)", score: 5, value: "leads-chasing" },
      ],
    },
    {
      id: "tools-count",
      title: "How many disconnected tools do you run to manage client records, inventory, and invoices?",
      options: [
        { label: "1–3 unified databases (Efficient setup)", score: 30, value: "unified" },
        { label: "4–6 disjointed portals (Manual syncing lag)", score: 15, value: "fragmented" },
        { label: "7+ disconnected tabs (Total software chaos)", score: 5, value: "7-plus-tools" },
      ],
    },
  ];

  const handleSelect = (score: number, value: string) => {
    const updatedAnswers = [...answers, value];
    const updatedScores = [...scores, score];
    setAnswers(updatedAnswers);
    setScores(updatedScores);

    if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1); // Result page
    }
  };

  const resetDiagnostic = () => {
    setActiveStep(0);
    setAnswers([]);
    setScores([]);
  };

  // Calculate overall efficiency percentage
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = 90; // 30 + 30 + 30
  const efficiencyScore = Math.min(100, Math.round((totalScore / maxScore) * 100));

  const getDiagnosticsAssessment = () => {
    if (efficiencyScore <= 35) {
      return {
        label: "⚠️ CRITICAL SYSTEM FRAGMENTATION ALERT",
        desc: "Your business is running at under 35% efficiency. Manual processes are causing severe team burnout, while delayed response times are letting premium leads drop. Unconnected spreadsheets and apps are draining thousands in lost sales daily. Immediate systems automation is required to secure your pipelines.",
        color: "text-rose-700 bg-rose-50 border-rose-200",
      };
    }
    if (efficiencyScore <= 70) {
      return {
        label: "⚠️ MODERATE REVENUE DRAG",
        desc: "Your system efficiency is capped around 50%. Manual data re-entry and delays in answering customer inquiries are costing your staff up to 12 productive hours weekly. Consolidating your billing and customer databases will boost lead conversions by +25% almost instantly.",
        color: "text-amber-800 bg-amber-50 border-amber-200",
      };
    }
    return {
      label: "🔒 SYSTEM LIMITATION RISK",
      desc: "You have a solid operational baseline, but manual invoice ledger syncs and disconnected communication ports are blocking your ability to scale. Building custom automation flows will free up another 15+ hours weekly to support expansion.",
      color: "text-emerald-800 bg-emerald-50 border-emerald-200",
    };
  };

  const assessment = getDiagnosticsAssessment();

  return (
    <section 
      id="diagnostic" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 py-20 overflow-hidden border-t border-slate-100"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center gap-8">
        
        {/* Section Title */}
        {activeStep < 3 && (
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Diagnostic Calculator
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-secondary">
              Calculate Your Health Score.
            </h2>
            <p className="text-xs text-neutral-muted max-w-xs font-medium">
              Assess your workflow fragmentation, time loss, and operational risk metrics.
            </p>
          </div>
        )}

        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeStep < 3 ? (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                {/* Step indicator */}
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                  Question {activeStep + 1} of 3
                </div>
                
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary text-left mb-2 leading-snug">
                  {questions[activeStep].title}
                </h3>

                {/* Options cards list */}
                <div className="flex flex-col gap-3">
                  {questions[activeStep].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(opt.score, opt.value)}
                      className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-primary/40 transition-all text-left text-xs md:text-sm font-semibold text-secondary flex justify-between items-center cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="h-4 w-4 text-neutral-muted shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* RESULT VIEW PANELS */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <div className="h-16 w-16 bg-primary-tint border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <BarChart2 className="h-9 w-9" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted block">
                    Calculated Health Score
                  </span>
                  
                  {/* Digital circular/percentage indicator */}
                  <h3 className="font-display text-5xl font-extrabold text-secondary mt-1">
                    {efficiencyScore}%
                    <span className="text-xs font-semibold text-neutral-muted font-sans block mt-1">
                      Operational Efficiency
                    </span>
                  </h3>
                </div>

                {/* Score Assessment Card */}
                <div className={`border rounded-2xl p-5 text-xs font-medium leading-relaxed text-left max-w-md ${assessment.color}`}>
                  <span className="font-bold uppercase tracking-wider block mb-1">
                    {assessment.label}
                  </span>
                  {assessment.desc}
                </div>

                {/* Interactive Action CTA */}
                <div className="flex flex-col gap-3 w-full max-w-sm mt-2">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (onBlueprintClick) {
                        onBlueprintClick(efficiencyScore, answers);
                      }
                    }}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full shadow-glow py-3 font-bold text-xs tracking-wider uppercase"
                  >
                    Eliminate My System Bottlenecks
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={resetDiagnostic}
                    leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                    className="text-neutral-muted text-xs hover:bg-slate-100"
                  >
                    Recalculate Score
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
