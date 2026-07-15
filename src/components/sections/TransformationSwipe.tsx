"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TransformationSwipe: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(50); // percentage 0-100

  return (
    <section 
      id="transformation" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-bg px-6 py-20 overflow-hidden border-t border-slate-100"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-8 text-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            Before vs After
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary max-w-md">
            Friction vs. Flow.
          </h2>
          <p className="text-xs md:text-sm text-neutral-muted max-w-sm font-medium">
            Swipe the divider to compare fragmented spreadsheet silos with our connected growth system.
          </p>
        </div>

        {/* Visual Swipe Simulator Container */}
        <div className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-premium">
          
          {/* BACKGROUND SIDE: SILOED FRICTION (Red theme) */}
          <div className="absolute inset-0 w-full h-full p-6 md:p-8 flex flex-col justify-between bg-rose-50/10">
            {/* Header label */}
            <div className="flex justify-start items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="h-4 w-4" />
              <span>Siloed Friction</span>
            </div>

            {/* Central visual diagrams */}
            <div className="flex-grow flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="h-10 w-10 rounded-full border border-rose-200 bg-rose-50 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-secondary">
                    Leads sitting in email databases
                  </h4>
                  <p className="text-[11px] text-neutral-muted">
                    No sync to pipelines. Follow-ups take hours.
                  </p>
                </div>
              </div>

              <div className="h-0.5 w-16 border-t-2 border-dashed border-rose-300 opacity-50" />

              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="h-10 w-10 rounded-full border border-rose-200 bg-rose-50 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-secondary">
                    Manual ledger billing raised on cards
                  </h4>
                  <p className="text-[11px] text-neutral-muted">
                    Hours spent writing invoice receipts weekly.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-2 font-bold text-center">
              Result: 40% leads lost & 18 hours wasted weekly.
            </div>
          </div>

          {/* CLIPPED OVERLAY: CONNECTED FLOW (Teal theme) */}
          <div 
            className="absolute inset-0 w-full h-full p-6 md:p-8 flex flex-col justify-between bg-emerald-50/15 pointer-events-none select-none"
            style={{
              clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`,
              borderRight: "2px solid #0F766E",
            }}
          >
            {/* Header label */}
            <div className="flex justify-start items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Connected Flow</span>
            </div>

            {/* Central visual diagrams */}
            <div className="flex-grow flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="h-10 w-10 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-primary">
                    Instant AI lead capture to CRM
                  </h4>
                  <p className="text-[11px] text-neutral-muted">
                    Automated SMS alerts trigger follow-ups within 60s.
                  </p>
                </div>
              </div>

              <div className="h-0.5 w-16 border-t-2 border-emerald-300 opacity-60" />

              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="h-10 w-10 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-primary">
                    Autopilot billing ledger invoicing
                  </h4>
                  <p className="text-[11px] text-neutral-muted">
                    No delay. Integrated Stripe ledgers execute billing.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-emerald-800 bg-emerald-50 border border-primary/20 rounded-lg p-2 font-bold text-center">
              Result: 100% lead follow-up & 85% admin hours saved.
            </div>
          </div>

          {/* SLIDER HANDLE LINE INDICATOR */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 pointer-events-none"
            style={{ left: `${sliderVal}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white border-2 border-primary shadow-premium flex items-center justify-center text-primary font-bold text-xs select-none">
              ⇄
            </div>
          </div>

          {/* RANGE INPUT CONTROLLER LAYER */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label="Before after visual transformation slider"
          />

        </div>
      </div>
    </section>
  );
};
