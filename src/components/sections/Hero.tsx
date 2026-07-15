"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onBlueprintClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBlueprintClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-dot-pattern px-6 py-20 text-center overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6 md:gap-8 mt-12">
        {/* Sparkle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-tint border border-primary/10 text-primary text-[10px] md:text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="h-3 w-3" />
          <span>HeyGrow Systems Platform</span>
        </motion.div>

        {/* Apple-style Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-secondary leading-[1.1] max-w-xl md:max-w-2xl"
        >
          The Operating System for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-700">
            Business Growth.
          </span>
        </motion.h1>

        {/* 12-Word Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl text-neutral-muted leading-relaxed max-w-md md:max-w-lg font-medium"
        >
          We replace fragmented software and manual admin with a single connected ecosystem.
        </motion.p>

        {/* Clean Mobile-Friendly CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onBlueprintClick}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:w-auto shadow-glow"
          >
            Get Free Blueprint
          </Button>
          
          <Link href="#portal" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Explore Paths
            </Button>
          </Link>
        </motion.div>

        {/* Visual Keynote Pulse Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer animated rings */}
            <div className="absolute h-20 w-20 md:h-28 md:w-28 rounded-full border border-primary/20 animate-ping opacity-35" />
            <div className="absolute h-14 w-14 md:h-20 md:w-20 rounded-full border border-primary/10 animate-pulse opacity-55" />
            
            {/* Core icon */}
            <div className="relative h-10 w-10 md:h-14 md:w-14 rounded-2xl bg-white border border-slate-200/80 shadow-premium flex items-center justify-center text-primary">
              <Activity className="h-5 w-5 md:h-7 md:w-7" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
