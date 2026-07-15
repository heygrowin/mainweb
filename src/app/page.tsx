"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, AlertTriangle, LayoutDashboard, Database, MessageSquare, Phone, Mail 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DiagnosticScore } from "@/components/sections/DiagnosticScore";
import { BlueprintModal } from "@/components/modals/BlueprintModal";

export default function Home() {
  const transitionConfig = { duration: 0.35, ease: "easeOut" } as const;
  const viewportConfig = { amount: 0.25, once: false };
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [initialBottleneck, setInitialBottleneck] = useState("");

  const triggerBlueprint = (bottleneckVal = "") => {
    setInitialBottleneck(bottleneckVal);
    setIsBlueprintOpen(true);
  };

  const handleDiagnosticSubmit = (score: number, answers: string[]) => {
    // Map diagnostic answers to form keys
    let bottleneckVal = "other";
    if (answers.includes("leads-chasing")) bottleneckVal = "lost-leads";
    else if (answers.includes("manual-entry")) bottleneckVal = "manual-work";
    else if (answers.includes("invoicing")) bottleneckVal = "manual-work";
    else if (answers.includes("7-plus-tools")) bottleneckVal = "no-integrations";
    
    triggerBlueprint(bottleneckVal);
  };

  return (
    <>
      <Navbar />

      {/* Main Flow Container */}
      <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar bg-white">
        
        {/* CHAPTER 1: POTENTIAL */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          {/* Breathing glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl flex flex-col items-center gap-6">
            {/* Visual Dot */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-4 w-4 rounded-full bg-primary shadow-glow mb-4"
            />
            
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={transitionConfig}
              className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary leading-tight"
            >
              Every business has untapped potential.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ ...transitionConfig, delay: 0.15 }}
              className="text-sm md:text-base text-neutral-muted leading-relaxed font-semibold max-w-xs"
            >
              We build the systems that unlock it.
            </motion.p>
          </div>
        </section>


        {/* CHAPTER 2: CHAOS */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-slate-50/20">
          <div className="relative z-10 max-w-xl flex flex-col items-center gap-8">
            
            {/* Scattered Erratic Nodes Visual */}
            <div className="relative h-44 w-full max-w-[320px] flex items-center justify-center">
              {[
                { label: "WhatsApp", x: -80, y: -45, delay: 0 },
                { label: "Excel", x: 80, y: -30, delay: 0.2 },
                { label: "Sticky Notes", x: -70, y: 40, delay: 0.4 },
                { label: "Manual Invoice", x: 60, y: 45, delay: 0.6 },
              ].map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    x: node.x,
                    y: node.y,
                  }}
                  viewport={viewportConfig}
                  animate={{
                    y: [node.y - 4, node.y + 4, node.y - 4]
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                    default: { type: "spring", duration: 0.6 }
                  }}
                  className="absolute px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/30 text-rose-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  {node.label}
                </motion.div>
              ))}
              
              {/* Central disconnected lead */}
              <div className="h-3 w-3 rounded-full bg-rose-400 animate-ping" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={transitionConfig}
              className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-secondary leading-tight max-w-sm"
            >
              But disconnected tools create operational friction.
            </motion.h2>
          </div>
        </section>


        {/* CHAPTER 3: CONNECTION */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          {/* Green central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-8">
            
            {/* Orbiting nodes */}
            <div className="relative h-56 w-full max-w-[400px] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full stroke-slate-200 stroke-1 pointer-events-none">
                <circle cx="200" cy="112" r="80" fill="none" className="stroke-dashed opacity-35" />
              </svg>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportConfig}
                className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-glow z-10"
              >
                <Activity className="h-6 w-6" />
              </motion.div>

              {[
                { label: "Website", x: 0, y: -85 },
                { label: "CRM", x: 60, y: -60 },
                { label: "AI Engine", x: 85, y: 0 },
                { label: "Billing", x: 60, y: 60 },
                { label: "Inventory", x: 0, y: 85 },
                { label: "Booking", x: -60, y: 60 },
                { label: "Dashboard", x: -85, y: 0 },
                { label: "Attendance", x: -60, y: -60 },
              ].map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  whileInView={{ opacity: 1, x: node.x, y: node.y }}
                  viewport={viewportConfig}
                  transition={{ type: "spring", duration: 0.7, delay: i * 0.05 }}
                  className="absolute px-2.5 py-1 rounded-xl border border-primary/20 bg-primary-tint text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-wider shadow-sm"
                >
                  {node.label}
                </motion.div>
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={transitionConfig}
              className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-secondary leading-tight max-w-sm"
            >
              We unify your operations into one connected flow.
            </motion.h2>
          </div>
        </section>


        {/* CHAPTER 4: TRANSFORMATION */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-slate-50/20">
          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-8">
            
            {/* Visual Dashboard Widgets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={transitionConfig}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
            >
              <div className="border border-slate-100 bg-white rounded-2xl p-5 shadow-premium flex flex-col gap-3 font-semibold text-secondary relative overflow-hidden">
                <div className="flex justify-between items-center text-[9px] uppercase text-neutral-muted">
                  <span>Intake Stream</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    AI Active
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-secondary flex items-center gap-1">
                    Priya (Lead)
                  </span>
                  <span className="text-[10px] text-neutral-muted">{"Assigned -> Booking sync"}</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 border border-emerald-100 bg-emerald-50/50 px-2 py-1 rounded w-fit mt-1">
                  Engaged in 42 seconds
                </span>
              </div>

              <div className="border border-slate-100 bg-white rounded-2xl p-5 shadow-premium flex flex-col gap-3 font-semibold text-secondary relative overflow-hidden">
                <div className="flex justify-between items-center text-[9px] uppercase text-neutral-muted">
                  <span>Billing Ledger</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-secondary font-mono">
                    INV-2940
                  </span>
                  <span className="text-[10px] text-neutral-muted">{"Auto Invoiced -> Stripe"}</span>
                </div>
                <span className="text-xs font-extrabold text-primary flex items-center gap-1 mt-1">
                  Paid ($4,500.00)
                </span>
              </div>

              <div className="border border-slate-100 bg-white rounded-2xl p-5 shadow-premium flex flex-col gap-3 font-semibold text-secondary relative overflow-hidden">
                <div className="flex justify-between items-center text-[9px] uppercase text-neutral-muted">
                  <span>Growth Velocity</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold text-primary font-display">
                    +18 hrs
                  </span>
                  <span className="text-[10px] text-neutral-muted">Saved weekly per worker</span>
                </div>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded w-fit mt-1 font-bold">
                  85% admin reduction
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ ...transitionConfig, delay: 0.1 }}
              className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-secondary leading-tight max-w-sm"
            >
              A calm operations center. Run business on autopilot.
            </motion.h2>
          </div>
        </section>


        {/* CHAPTER 5: CHOOSE YOUR JOURNEY */}
        <section id="portal-selection" className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-10">
            
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Portal Selection
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary max-w-md">
                What brings you here today?
              </h2>
            </div>

            {/* Redirection cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              
              <Link href="/industries" className="w-full flex">
                <Card className="flex flex-col justify-between p-6 h-60 text-left bg-slate-50/50 hover:bg-white hover:border-primary/40 w-full group relative overflow-hidden" hoverEffect={true}>
                  <div className="absolute top-0 right-0 h-24 w-24 pointer-events-none opacity-20 filter blur-2xl rounded-full bg-gradient-to-tr from-primary to-teal-500" />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary block mb-2">
                      Founder / Owner
                    </span>
                    <h3 className="font-display text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5 text-primary shrink-0" />
                      🏢 Grow My Business
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed font-semibold">
                      Custom operations diagnostics & integration blueprints.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-primary pt-3 border-t border-slate-100">
                    <span>Explore Blueprints</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/products" className="w-full flex">
                <Card className="flex flex-col justify-between p-6 h-60 text-left bg-slate-50/50 hover:bg-white hover:border-indigo-400/40 w-full group relative overflow-hidden" hoverEffect={true}>
                  <div className="absolute top-0 right-0 h-24 w-24 pointer-events-none opacity-20 filter blur-2xl rounded-full bg-gradient-to-tr from-indigo-500 to-teal-500" />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 block mb-2">
                      Manager / Operator
                    </span>
                    <h3 className="font-display text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                      <Database className="h-5 w-5 text-indigo-600 shrink-0" />
                      🚀 Explore Products
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed font-semibold">
                      SaaS standalone components & interactive sandboxes.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-3 border-t border-slate-100">
                    <span>Explore Sandboxes</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>

            </div>

          </div>
        </section>

        {/* CHAPTER 6: DIAGNOSTIC CALCULATOR */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center bg-white px-6">
          <div className="w-full max-w-xl">
            <DiagnosticScore onBlueprintClick={handleDiagnosticSubmit} />
          </div>
        </section>

        {/* CHAPTER 7: DIRECT ACTION CTA */}
        <section className="min-h-screen pt-28 pb-12 w-full snap-start shrink-0 relative flex flex-col items-center justify-center bg-secondary text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          
          <div className="mx-auto max-w-xl px-6 flex flex-col items-center gap-6 relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
              Ready to unify your operations?
            </h3>
            
            <p className="text-xs md:text-sm text-slate-300 max-w-sm leading-relaxed">
              Skip the forms. Speak directly to our systems architecture team today via WhatsApp, direct call, or email.
            </p>
            
            {/* Direct Connect panel grid */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-4 justify-center items-center w-full max-w-md">
              <a href="https://wa.me/919111005300" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex">
                <Button variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-700 border-none py-2.5 flex items-center justify-center gap-2" leftIcon={<MessageSquare className="h-4 w-4" />}>
                  WhatsApp Chat
                </Button>
              </a>
              <a href="tel:9111005300" className="w-full sm:w-auto flex">
                <Button variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 py-2.5 flex items-center justify-center gap-2" leftIcon={<Phone className="h-4 w-4" />}>
                  Call 9111005300
                </Button>
              </a>
              <a href="mailto:heygrowteam@gmail.com" className="w-full sm:w-auto flex">
                <Button variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 py-2.5 flex items-center justify-center gap-2" leftIcon={<Mail className="h-4 w-4" />}>
                  Email Team
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Slide 8: Site Directory Footer */}
        <section className="snap-start shrink-0 bg-white w-full border-t border-slate-100">
          <Footer />
        </section>

      </main>

      <BlueprintModal 
        isOpen={isBlueprintOpen} 
        onClose={() => setIsBlueprintOpen(false)} 
        initialBottleneck={initialBottleneck}
      />
    </>
  );
}
