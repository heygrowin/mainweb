"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { BlueprintModal } from "@/components/modals/BlueprintModal";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "Are you a software development agency or a consulting company?",
      answer: "HeyGrow is a Business Growth Systems company. We combine operational consulting with customized software engineering and ready-to-use products. We don't just write code; we study your workflows, identify bottlenecks, and design the complete digital system that runs your operations.",
    },
    {
      question: "What does the Free Growth Blueprint include?",
      answer: "The Growth Blueprint is a customized diagnostic roadmap. We shadow your team workflows, audit tools, locate where manual entry drains time or where leads drop, and present a visual architecture diagram connecting web, CRM, AI, automation, billing, and dashboard logs. It is 100% free, with no obligation.",
    },
    {
      question: "Can we purchase the source code of our systems?",
      answer: "Yes, this is one of our core philosophies. Every reusable module we build is a HeyGrow Product. You can either subscribe to run the product on our servers, or buy a perpetual lifetime license which transfers full codebase ownership and database control directly to your servers.",
    },
    {
      question: "How long does a typical implementation take?",
      answer: "Growth Foundations (Web setup, analytics tracking, custom emails, and billing paths) deploy within 2 to 3 weeks. Custom Growth Systems (integrated CRM flows, material inventory managers, custom dashboards) are built in phases, with initial core modules live within 4 to 6 weeks.",
    },
    {
      question: "How do you handle database security and hosting ownership?",
      answer: "We set up databases (Firebase Firestore, PostgreSQL, etc.) directly inside your private cloud account. You retain 100% administrative keys and data ownership. We configure strict security access controls and auto-backups so that operations stay safe and continuous.",
    },
  ];

  return (
    <>
      <Navbar onBlueprintClick={() => setIsBlueprintOpen(true)} />
      
      <main className="flex-grow pt-32 pb-20 bg-neutral-bg">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          {/* Header */}
          <div className="flex flex-col items-start gap-4 mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-base text-neutral-muted max-w-xl">
              Learn about our growth systems, integration process, licensing model, and blueprints.
            </p>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              
              return (
                <Card
                  key={idx}
                  className="p-5 md:p-6 hover:border-slate-200 cursor-pointer overflow-hidden transition-all duration-300 bg-white"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  hoverEffect={true}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                      <h3 className="font-display text-sm md:text-base font-bold text-secondary text-left">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className="p-1 rounded bg-slate-50 border border-slate-100 text-secondary">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="border-t border-slate-50 pt-4">
                          <p className="text-xs md:text-sm text-neutral-muted leading-relaxed text-left">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>

        </div>
      </main>

      <BlueprintModal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)} />
      <Footer />
    </>
  );
}
