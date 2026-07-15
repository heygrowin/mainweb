"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Phone, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBottleneck?: string;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white border border-slate-200 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="border-b border-slate-100 bg-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="font-display text-sm font-bold text-secondary">
                  Direct Support
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-lg text-secondary transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8 flex flex-col gap-6 text-center">
              <div>
                <h3 className="font-display text-lg font-bold text-secondary mb-2">
                  Connect Directly
                </h3>
                <p className="text-xs text-neutral-muted leading-relaxed">
                  Skip the forms. Speak directly to our systems architecture team today.
                </p>
              </div>

              {/* Direct Connect Options Panel */}
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/919111005300" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex w-full"
                >
                  <Button 
                    type="button" 
                    variant="primary" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 border-none py-2.5 flex items-center justify-center gap-2"
                    leftIcon={<MessageSquare className="h-4 w-4" />}
                  >
                    WhatsApp Chat
                  </Button>
                </a>
                
                <a 
                  href="tel:9111005300" 
                  className="flex w-full"
                >
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-slate-200 text-secondary hover:bg-slate-50 py-2.5 flex items-center justify-center gap-2"
                    leftIcon={<Phone className="h-4 w-4 text-primary" />}
                  >
                    Call 9111005300
                  </Button>
                </a>
                
                <a 
                  href="mailto:heygrowteam@gmail.com" 
                  className="flex w-full"
                >
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-slate-200 text-secondary hover:bg-slate-50 py-2.5 flex items-center justify-center gap-2"
                    leftIcon={<Mail className="h-4 w-4 text-primary" />}
                  >
                    Email Support
                  </Button>
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="w-full text-xs"
                >
                  Close Window
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
