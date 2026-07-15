"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Database, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/card";

export const PortalSplit: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="portal" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 py-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-12 text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            Choose Your Track
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary max-w-md">
            What brings you here today?
          </h2>
        </div>

        {/* Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Card A: Business Owners */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleScroll("transformation")}
            className="cursor-pointer text-left"
          >
            <Card 
              className="flex flex-col justify-between p-8 h-80 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
              hoverEffect={false}
            >
              <div className="absolute top-0 right-0 h-32 w-32 pointer-events-none opacity-20 filter blur-2xl rounded-full bg-gradient-to-tr from-primary to-teal-500" />
              
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/20 bg-primary-tint px-2.5 py-0.5 rounded-full inline-block mb-4">
                  For Owners & Founders
                </span>
                
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-secondary mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <LayoutDashboard className="h-6 w-6 text-primary shrink-0" />
                  Business Growth
                </h3>
                
                <p className="text-xs md:text-sm text-neutral-muted leading-relaxed font-medium">
                  We study operations, identify operational bottlenecks, and construct custom connected software systems.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-primary pt-4 border-t border-slate-100">
                <span>Explore Custom Blueprints</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </motion.div>

          {/* Card B: Software Operators */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleScroll("products")}
            className="cursor-pointer text-left"
          >
            <Card 
              className="flex flex-col justify-between p-8 h-80 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
              hoverEffect={false}
            >
              <div className="absolute top-0 right-0 h-32 w-32 pointer-events-none opacity-20 filter blur-2xl rounded-full bg-gradient-to-tr from-indigo-500 to-teal-500" />
              
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-4">
                  For Operators & Admins
                </span>
                
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-secondary mb-3 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                  <Database className="h-6 w-6 text-indigo-600 shrink-0" />
                  Software Products
                </h3>
                
                <p className="text-xs md:text-sm text-neutral-muted leading-relaxed font-medium">
                  Deploy standalone SaaS products (CRM, Inventory, Billing, Booking, Attendance) hosted or perpetual licensed.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-4 border-t border-slate-100">
                <span>Try Ready-to-Use Sandbox</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
