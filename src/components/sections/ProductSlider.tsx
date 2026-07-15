"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Database, ShoppingBag, DollarSign, Calendar, BarChart3, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoModal } from "@/components/modals/DemoModal";
import { getProducts, ProductData } from "@/lib/dataService";

export const ProductSlider: React.FC = () => {
  const [isSubscription, setIsSubscription] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoProduct, setDemoProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const getIcon = (key: string, className = "h-5 w-5") => {
    const map: Record<string, React.ReactNode> = {
      Database: <Database className={`${className} text-teal-600`} />,
      ShoppingBag: <ShoppingBag className={`${className} text-blue-600`} />,
      DollarSign: <DollarSign className={`${className} text-indigo-600`} />,
      Calendar: <Calendar className={`${className} text-cyan-600`} />,
      Clock: <Clock className={`${className} text-amber-600`} />,
      BarChart3: <BarChart3 className={`${className} text-rose-600`} />,
    };
    return map[key] || <Database className={`${className} text-teal-600`} />;
  };

  const getCardColor = (key: string) => {
    const colors: Record<string, string> = {
      Database: "border-teal-100 bg-teal-50/5",
      ShoppingBag: "border-blue-100 bg-blue-50/5",
      DollarSign: "border-indigo-100 bg-indigo-50/5",
      Calendar: "border-cyan-100 bg-cyan-50/5",
      Clock: "border-amber-100 bg-amber-50/5",
      BarChart3: "border-rose-100 bg-rose-50/5",
    };
    return colors[key] || "border-teal-100 bg-teal-50/5";
  };

  return (
    <section 
      id="products" 
      className="py-24 bg-white border-t border-slate-100 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Ready-to-Use Modules
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary">
              The Products.
            </h2>
            <p className="text-xs md:text-sm text-neutral-muted max-w-xs font-medium">
              Swipe the carousel to examine our modules. Try any software in a demo sandbox instantly.
            </p>
          </div>

          {/* Pricing Toggle Slider */}
          <div className="relative flex items-center p-1 bg-slate-100 rounded-full w-64 shadow-inner self-start md:self-end">
            <button
              onClick={() => setIsSubscription(true)}
              className={`relative z-10 w-1/2 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                isSubscription ? "text-secondary font-bold" : "text-neutral-muted"
              }`}
            >
              Subscription
            </button>
            <button
              onClick={() => setIsSubscription(false)}
              className={`relative z-10 w-1/2 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                !isSubscription ? "text-primary font-bold" : "text-neutral-muted"
              }`}
            >
              Perpetual
            </button>
            
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-white border border-slate-200"
              layout
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              style={{
                left: isSubscription ? "4px" : "50%",
                right: isSubscription ? "50%" : "4px",
                width: "calc(50% - 4px)",
              }}
            />
          </div>
        </div>

        {/* Horizontal Swipeable Product Cards Container */}
        {loading ? (
          <div className="flex gap-6 overflow-x-auto pb-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="shrink-0 w-[280px] md:w-[320px] h-[340px] bg-slate-200/60 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
            {products.map((prod) => (
              <div 
                key={prod.id} 
                className="snap-start shrink-0 w-[280px] md:w-[320px]"
              >
                <Card
                  className={`flex flex-col justify-between p-6 h-[340px] hover:border-slate-300 relative border ${getCardColor(prod.iconKey)}`}
                  hoverEffect={true}
                >
                  <div>
                    {/* Card Header details */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                        {getIcon(prod.iconKey)}
                      </div>
                      <div className="text-right text-sm font-extrabold text-secondary font-display">
                        {isSubscription ? (
                          <span>
                            Free - ${prod.subPrice}
                            <span className="text-[10px] text-neutral-muted font-sans font-medium">/mo</span>
                          </span>
                        ) : (
                          <span className="text-primary font-bold">
                            ${prod.buyPrice}
                            <span className="text-[9px] text-neutral-muted block font-sans font-medium">one-time</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-secondary mb-1">
                      {prod.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-muted leading-relaxed min-h-[48px]">
                      {prod.tagline}
                    </p>

                    {/* Micro interaction simulation panel preview graphic */}
                    <div className="mt-4 p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-[9px] text-neutral-muted font-mono">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Demo Dashboard Active
                      </span>
                      <span>v1.2.0</span>
                    </div>
                  </div>

                  {/* Direct Action Triggers */}
                  <div className="mt-6 pt-4 border-t border-slate-50 flex flex-col gap-2">
                    <Button
                      variant={prod.buyUrl ? "outline" : "primary"}
                      size="sm"
                      onClick={() => {
                        if (prod.demoUrl) window.open(prod.demoUrl, "_blank");
                        else setDemoProduct(prod);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 group text-xs py-2 hover:bg-slate-50"
                      leftIcon={<Play className="h-3 w-3 text-primary transition-transform group-hover:scale-110" />}
                    >
                      Launch Demo
                    </Button>
                    
                    {prod.buyUrl && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => window.open(prod.buyUrl, "_blank")}
                        className="w-full text-xs py-2"
                      >
                        Buy Now
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Swipe hint */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-muted mt-2">
          <span>Swipe horizontally to view more products</span>
        </div>

        {/* Self-contained Sandbox Modal */}
        <DemoModal
          isOpen={demoProduct !== null}
          onClose={() => setDemoProduct(null)}
          productKey={demoProduct ? demoProduct.id : null}
          productName={demoProduct ? demoProduct.name : ""}
        />

      </div>
    </section>
  );
};
