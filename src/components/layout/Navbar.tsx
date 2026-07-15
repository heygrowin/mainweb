"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onBlueprintClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBlueprintClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          scrolled 
            ? "py-2 px-3 mt-1.5 md:py-3 md:px-8 md:mt-2 max-w-7xl mx-auto rounded-full" 
            : "py-4 px-6 md:px-12 bg-transparent"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between rounded-full transition-all duration-300 ${
            scrolled 
              ? "glass-panel border border-slate-200/80 px-4 py-2 md:px-8 shadow-premium" 
              : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <img src="/logo.png" alt="HeyGrow Logo" className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("/#");
              const isActive = isHash 
                ? pathname === "/" && currentHash === link.href.substring(1)
                : pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-neutral-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBlueprintClick}
              rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              className="group"
            >
              Get Free Blueprint
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg text-secondary hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-4 z-40 md:hidden glass-panel border border-slate-200/80 rounded-3xl p-5 shadow-premium-hover flex flex-col gap-5 transition-all duration-300 ${
              scrolled ? "top-14" : "top-18"
            }`}
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-secondary hover:text-primary py-1 border-b border-slate-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  if (onBlueprintClick) onBlueprintClick();
                }}
                className="w-full text-xs py-2"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Get Free Blueprint
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
