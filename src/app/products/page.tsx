"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoModal } from "@/components/modals/DemoModal";
import { BlueprintModal } from "@/components/modals/BlueprintModal";
import { 
  Check, Play, Database, ShoppingBag, 
  DollarSign, Calendar, Clock, BarChart3, Sparkles 
} from "lucide-react";
import { getProducts, ProductData } from "@/lib/dataService";

export default function ProductsPage() {
  const [isSubscription, setIsSubscription] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoProduct, setDemoProduct] = useState<ProductData | null>(null);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const getIcon = (key: string, className = "h-6 w-6") => {
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
    <>
      <Navbar onBlueprintClick={() => setIsBlueprintOpen(true)} />
      
      <main className="flex-grow pt-32 pb-20 bg-neutral-bg">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-tint border border-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SaaS Components</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary leading-tight">
                Software Products
              </h1>
              <p className="text-sm md:text-base text-neutral-muted max-w-xl">
                Deploy standalone operational modules instantly. Select your license configuration preference.
              </p>
            </div>

            {/* Pricing toggle */}
            <div className="relative flex items-center p-1 bg-slate-200/60 rounded-full w-[280px] shadow-inner self-start md:self-end">
              <button
                onClick={() => setIsSubscription(true)}
                className={`relative z-10 w-1/2 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  isSubscription ? "text-secondary font-bold" : "text-neutral-muted"
                }`}
              >
                SaaS Subscription
              </button>
              <button
                onClick={() => setIsSubscription(false)}
                className={`relative z-10 w-1/2 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  !isSubscription ? "text-primary font-bold" : "text-neutral-muted"
                }`}
              >
                Own Forever
              </button>
              
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white border border-slate-200"
                style={{
                  left: isSubscription ? "4px" : "50%",
                  right: isSubscription ? "50%" : "4px",
                  width: "calc(50% - 4px)",
                }}
              />
            </div>
          </div>

          {/* Grid Marketplace */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 bg-slate-200/60 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((prod) => (
                <Card
                  key={prod.id}
                  className={`flex flex-col justify-between p-6 md:p-8 hover:border-slate-300 relative border ${getCardColor(prod.iconKey)}`}
                  hoverEffect={true}
                >
                  <div>
                    {/* Card Header details */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                        {getIcon(prod.iconKey)}
                      </div>
                      <div className="text-right text-base font-extrabold text-secondary font-display">
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
                    
                    <p className="text-xs text-neutral-muted leading-relaxed mb-6">
                      {prod.tagline}
                    </p>

                    <div className="border-t border-slate-100 my-4" />

                    {/* Checklist */}
                    <ul className="flex flex-col gap-3">
                      {prod.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-secondary font-medium">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <Button
                      variant={prod.buyUrl ? "outline" : "primary"}
                      onClick={() => {
                        if (prod.demoUrl) window.open(prod.demoUrl, "_blank");
                        else setDemoProduct(prod);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 group text-xs hover:bg-slate-50"
                      leftIcon={<Play className="h-3.5 w-3.5 text-primary transition-transform group-hover:scale-110" />}
                    >
                      Launch Demo
                    </Button>
                    
                    {prod.buyUrl ? (
                      <Button variant="primary" size="sm" className="w-full" onClick={() => window.open(prod.buyUrl, "_blank")}>
                        Buy Now
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        {isSubscription ? "Subscribe" : "Purchase License"}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Sandbox Modals */}
      <DemoModal
        isOpen={demoProduct !== null}
        onClose={() => setDemoProduct(null)}
        productKey={demoProduct ? demoProduct.id : null}
        productName={demoProduct ? demoProduct.name : ""}
      />

      <BlueprintModal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)} />
      <Footer />
    </>
  );
}
