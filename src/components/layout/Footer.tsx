"use client";

import React, { useState, useEffect } from "react";
import { Activity, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFooterSettings, FooterData, defaultFooterData } from "@/lib/dataService";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);

  useEffect(() => {
    async function loadFooter() {
      const data = await getFooterSettings();
      setFooterData(data);
    }
    loadFooter();
  }, []);

  return (
    <footer className="bg-white border-t border-neutral-border pt-20 pb-12 px-6 md:px-12 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16">
          
          {/* Logo & Narrative Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="HeyGrow Logo" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm md:text-base text-neutral-muted leading-relaxed max-w-sm whitespace-pre-wrap">
              {footerData.narrativeText}
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                Newsletter
              </h4>
              <div className="relative flex max-w-sm items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm bg-neutral-bg border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary"
                />
                <button 
                  className="absolute right-1 p-1.5 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerData.columns.map((column, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-neutral-muted hover:text-primary transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-neutral-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-muted">
          <p>{footerData.copyrightText.replace("2026", currentYear.toString())}</p>
          <div className="flex gap-6">
            <span className="hover:text-primary transition-colors cursor-pointer">Security Protocol</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Systems Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
