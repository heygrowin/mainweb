"use client";

import React, { useState, useEffect } from "react";
import { 
  Building, Gem, Truck, HeartPulse, GraduationCap, Plane, 
  HardHat, Utensils, Calendar, Database, ShoppingBag, DollarSign, 
  Clock, BarChart3, Lock, ShieldCheck, Mail, Phone, Trash2, Edit, Plus, LogOut, Check 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getIndustries, saveIndustry, deleteIndustry, IndustryData,
  getProducts, saveProduct, deleteProduct, ProductData,
  getBlueprintRequests, LeadRequest,
  getFooterSettings, saveFooterSettings, FooterData
} from "@/lib/dataService";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"leads" | "industries" | "products" | "footer">("leads");
  
  // Data lists
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [industries, setIndustries] = useState<IndustryData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  
  // Form states
  const [isIndustryFormOpen, setIsIndustryFormOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<IndustryData | null>(null);
  const [industryFormData, setIndustryFormData] = useState<IndustryData>({
    slug: "", name: "", desc: "", notionUrl: "", iconKey: "Building"
  });

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [productFormData, setProductFormData] = useState<{
    id: string; name: string; tagline: string; iconKey: string;
    subPrice: string; buyPrice: string; demoUrl?: string; buyUrl?: string; featuresText: string;
  }>({
    id: "", name: "", tagline: "", iconKey: "Database", subPrice: "49", buyPrice: "999", demoUrl: "", buyUrl: "", featuresText: ""
  });

  // Check login state inside localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("heygrow_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch list helper functions
  const loadData = async () => {
    try {
      const [leadsList, indList, prodList, footData] = await Promise.all([
        getBlueprintRequests(),
        getIndustries(),
        getProducts(),
        getFooterSettings()
      ]);
      setLeads(leadsList);
      setIndustries(indList);
      setProducts(prodList);
      setFooterData(footData);
    } catch (e) {
      console.error("Failed to load list details:", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "heygrow@#2026") {
      setIsAuthenticated(true);
      localStorage.setItem("heygrow_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid passcode access key. Try again.");
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("heygrow_admin_auth");
  };

  // Icon mapping
  const renderIcon = (key: string, className = "h-5 w-5") => {
    const iconsMap: Record<string, React.ReactNode> = {
      Building: <Building className={className} />,
      Gem: <Gem className={className} />,
      Truck: <Truck className={className} />,
      HeartPulse: <HeartPulse className={className} />,
      GraduationCap: <GraduationCap className={className} />,
      Plane: <Plane className={className} />,
      HardHat: <HardHat className={className} />,
      Utensils: <Utensils className={className} />,
      Calendar: <Calendar className={className} />,
      Database: <Database className={className} />,
      ShoppingBag: <ShoppingBag className={className} />,
      DollarSign: <DollarSign className={className} />,
      Clock: <Clock className={className} />,
      BarChart3: <BarChart3 className={className} />,
    };
    return iconsMap[key] || <Building className={className} />;
  };

  // ----------------------------------------------------
  // INDUSTRIES ACTIONS
  // ----------------------------------------------------
  
  const handleOpenAddIndustry = () => {
    setEditingIndustry(null);
    setIndustryFormData({ slug: "", name: "", desc: "", notionUrl: "", iconKey: "Building" });
    setIsIndustryFormOpen(true);
  };

  const handleOpenEditIndustry = (ind: IndustryData) => {
    setEditingIndustry(ind);
    setIndustryFormData({ ...ind });
    setIsIndustryFormOpen(true);
  };

  const handleSaveIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industryFormData.slug || !industryFormData.name || !industryFormData.desc || !industryFormData.notionUrl) {
      alert("All fields are required.");
      return;
    }
    const success = await saveIndustry(industryFormData);
    if (success) {
      setIsIndustryFormOpen(false);
      loadData();
    } else {
      alert("Failed to write to database.");
    }
  };

  const handleDeleteIndustry = async (slug: string) => {
    if (confirm("Are you sure you want to delete this industry worksheet?")) {
      const success = await deleteIndustry(slug);
      if (success) loadData();
    }
  };

  // ----------------------------------------------------
  // PRODUCTS ACTIONS
  // ----------------------------------------------------

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      id: "", name: "", tagline: "", iconKey: "Database", subPrice: "49", buyPrice: "999", demoUrl: "", buyUrl: "", featuresText: ""
    });
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductData) => {
    setEditingProduct(prod);
    setProductFormData({
      id: prod.id,
      name: prod.name,
      tagline: prod.tagline,
      iconKey: prod.iconKey,
      subPrice: prod.subPrice,
      buyPrice: prod.buyPrice,
      demoUrl: prod.demoUrl || "",
      buyUrl: prod.buyUrl || "",
      featuresText: prod.features.join(", ")
    });
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.id || !productFormData.name || !productFormData.tagline) {
      alert("Please fill out required fields.");
      return;
    }

    const payload: ProductData = {
      id: productFormData.id,
      name: productFormData.name,
      tagline: productFormData.tagline,
      iconKey: productFormData.iconKey,
      subPrice: productFormData.subPrice,
      buyPrice: productFormData.buyPrice,
      demoUrl: productFormData.demoUrl,
      buyUrl: productFormData.buyUrl,
      features: productFormData.featuresText.split(",").map((f) => f.trim()).filter((f) => f.length > 0)
    };

    const success = await saveProduct(payload);
    if (success) {
      setIsProductFormOpen(false);
      loadData();
    } else {
      alert("Failed to write product data.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) loadData();
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
        <Card className="w-full max-w-sm p-8 bg-[#1E293B] border border-slate-700/80 shadow-2xl flex flex-col items-center gap-6">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow">
            <Lock className="h-6 w-6" />
          </div>
          
          <div className="text-center">
            <h1 className="font-display text-xl font-bold text-white mb-1">
              HeyGrow Access Control
            </h1>
            <p className="text-xs text-slate-400">
              Provide authorization passcode to configure databases.
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <input
                type="password"
                placeholder="Enter passcode key"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-primary/50 text-center font-mono"
              />
              {loginError && <span className="text-[10px] text-rose-400 font-semibold text-center">{loginError}</span>}
            </div>

            <Button type="submit" variant="primary" className="w-full py-2.5">
              Access Console
            </Button>
          </form>
        </Card>
      </main>
    );
  }

  // ----------------------------------------------------
  // ADMIN CONSOLE INTERFACE
  // ----------------------------------------------------

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* Header Panel */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1E293B] p-6 rounded-3xl border border-slate-700/40">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-2xl font-bold text-white">
                  Console Dashboard
                </h1>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                  db ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  <ShieldCheck className="h-3 w-3" />
                  {db ? "Firestore Active" : "Local Database Mode"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage landing workflows, product matrices, and review incoming requests.
              </p>
            </div>

            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="text-xs border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-800 flex items-center gap-1.5"
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Sign Out
            </Button>
          </div>

          {/* Navigation tabs */}
          <div className="flex border-b border-slate-800 gap-6 overflow-x-auto no-scrollbar">
            {(["leads", "industries", "products", "footer"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-semibold capitalize border-b-2 transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "border-primary text-white font-bold" 
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "leads" ? "Leads Inbox" : tab === "industries" ? "Industry Blueprints" : "SaaS Products"}
              </button>
            ))}
          </div>

          {/* -------------------------------------------------- */}
          {/* TAB 1: LEADS INBOX */}
          {/* -------------------------------------------------- */}
          {activeTab === "leads" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Blueprint Inquiries ({leads.length})</h2>
                <Button variant="outline" size="sm" onClick={loadData} className="text-xs border-slate-700">
                  Refresh Inbox
                </Button>
              </div>

              {leads.length === 0 ? (
                <Card className="bg-[#1E293B] border-slate-800/80 p-12 text-center text-slate-400 text-xs">
                  No inquiries received yet.
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className="bg-[#1E293B] border border-slate-700/30 p-5 flex flex-col justify-between gap-4 text-slate-300">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-white font-display">
                            {lead.contactName}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 text-xs">
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-primary" /> {lead.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-primary" /> {lead.phone}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-700/40 pt-3 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Bottleneck:</span>
                        <span className="font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                          {lead.bottleneck}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* TAB 2: INDUSTRIES MANAGER */}
          {/* -------------------------------------------------- */}
          {activeTab === "industries" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Worksheet Industries ({industries.length})</h2>
                <Button variant="primary" size="sm" onClick={handleOpenAddIndustry} className="text-xs" leftIcon={<Plus className="h-4 w-4" />}>
                  Add Industry Card
                </Button>
              </div>

              {/* Form Dialog Box */}
              {isIndustryFormOpen && (
                <Card className="bg-[#1E293B] border border-slate-600/50 p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-700 pb-2">
                    {editingIndustry ? "Edit Industry Worksheet" : "Create Industry Worksheet"}
                  </h3>
                  
                  <form onSubmit={handleSaveIndustry} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Sector Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Real Estate"
                        value={industryFormData.name}
                        onChange={(e) => setIndustryFormData({ ...industryFormData, name: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">URL Slug *</label>
                      <input
                        type="text"
                        placeholder="e.g. real-estate"
                        disabled={editingIndustry !== null}
                        value={industryFormData.slug}
                        onChange={(e) => setIndustryFormData({ ...industryFormData, slug: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Notion Blueprint Link *</label>
                      <input
                        type="url"
                        placeholder="https://notion.so/..."
                        value={industryFormData.notionUrl}
                        onChange={(e) => setIndustryFormData({ ...industryFormData, notionUrl: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Visual Icon Key</label>
                      <select
                        value={industryFormData.iconKey}
                        onChange={(e) => setIndustryFormData({ ...industryFormData, iconKey: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      >
                        {["Building", "Gem", "Truck", "HeartPulse", "GraduationCap", "Plane", "HardHat", "Utensils", "Calendar"].map((k) => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <label className="text-slate-400 font-bold">Growth System Description Paragraph *</label>
                      <textarea
                        rows={2}
                        placeholder="Provide a 1-2 sentence operational description summary."
                        value={industryFormData.desc}
                        onChange={(e) => setIndustryFormData({ ...industryFormData, desc: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-700">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsIndustryFormOpen(false)} className="text-xs border-slate-700">
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" size="sm" className="text-xs">
                        Save Worksheet
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((ind) => (
                  <Card key={ind.slug} className="bg-[#1E293B] border border-slate-800/80 p-5 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start mb-3 pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                            {renderIcon(ind.iconKey, "h-4.5 w-4.5 text-primary")}
                          </div>
                          <span className="text-sm font-bold text-white">{ind.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleOpenEditIndustry(ind)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteIndustry(ind.slug)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors cursor-pointer">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-semibold mb-2">
                        {ind.desc}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono break-all border-t border-slate-800/50 pt-2">
                      Notion: {ind.notionUrl}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* TAB 3: SAAS PRODUCTS MANAGER */}
          {/* -------------------------------------------------- */}
          {activeTab === "products" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">SaaS Modules ({products.length})</h2>
                <Button variant="primary" size="sm" onClick={handleOpenAddProduct} className="text-xs" leftIcon={<Plus className="h-4 w-4" />}>
                  Add Product Card
                </Button>
              </div>

              {/* Form Dialog Box */}
              {isProductFormOpen && (
                <Card className="bg-[#1E293B] border border-slate-600/50 p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-700 pb-2">
                    {editingProduct ? "Edit Product" : "Create Product"}
                  </h3>

                  <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Product ID *</label>
                      <input
                        type="text"
                        placeholder="e.g. crm"
                        disabled={editingProduct !== null}
                        value={productFormData.id}
                        onChange={(e) => setProductFormData({ ...productFormData, id: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Product Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. CRM Engine"
                        value={productFormData.name}
                        onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">SaaS Monthly Subscription ($) *</label>
                      <input
                        type="text"
                        placeholder="e.g. 49"
                        value={productFormData.subPrice}
                        onChange={(e) => setProductFormData({ ...productFormData, subPrice: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Perpetual Lifetime Purchase ($) *</label>
                      <input
                        type="text"
                        placeholder="e.g. 999"
                        value={productFormData.buyPrice}
                        onChange={(e) => setProductFormData({ ...productFormData, buyPrice: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Demo URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://demo.heygrow.in"
                        value={productFormData.demoUrl || ""}
                        onChange={(e) => setProductFormData({ ...productFormData, demoUrl: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Buy URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://buy.stripe.com/..."
                        value={productFormData.buyUrl || ""}
                        onChange={(e) => setProductFormData({ ...productFormData, buyUrl: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Visual Icon Key</label>
                      <select
                        value={productFormData.iconKey}
                        onChange={(e) => setProductFormData({ ...productFormData, iconKey: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      >
                        {["Database", "ShoppingBag", "DollarSign", "Calendar", "Clock", "BarChart3"].map((k) => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-bold">Module Tagline *</label>
                      <input
                        type="text"
                        placeholder="e.g. Unify lead pipelines"
                        value={productFormData.tagline}
                        onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <label className="text-slate-400 font-bold">Features list (comma-separated strings) *</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Instant web forms integration, Automated WhatsApp drips"
                        value={productFormData.featuresText}
                        onChange={(e) => setProductFormData({ ...productFormData, featuresText: e.target.value })}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-700">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsProductFormOpen(false)} className="text-xs border-slate-700">
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" size="sm" className="text-xs">
                        Save Product
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <Card key={prod.id} className="bg-[#1E293B] border border-slate-800/80 p-5 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start mb-3 pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                            {renderIcon(prod.iconKey, "h-4.5 w-4.5 text-primary")}
                          </div>
                          <span className="text-sm font-bold text-white">{prod.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleOpenEditProduct(prod)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteProduct(prod.id)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors cursor-pointer">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed min-h-[32px] mb-3">
                        {prod.tagline}
                      </p>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800/40">
                        <span>SaaS: <strong className="text-white">Free - ${prod.subPrice}/mo</strong></span>
                        <span>Buy: <strong className="text-primary">${prod.buyPrice}</strong></span>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-1 border-t border-slate-800/50 pt-2">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="text-[9px] text-slate-400 flex items-center gap-1">
                          <Check className="h-3 w-3 text-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {/* ---------------------------------------------------- */}
          {/* FOOTER TAB */}
          {/* ---------------------------------------------------- */}
          {activeTab === "footer" && footerData && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Edit className="h-4 w-4 text-primary" /> Footer Configuration
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Edit the global footer content shown on all pages.
                  </p>
                </div>
                <Button 
                  onClick={async () => {
                    const success = await saveFooterSettings(footerData);
                    if(success) alert("Footer settings saved successfully!");
                    else alert("Failed to save footer settings.");
                  }} 
                  className="bg-primary text-white hover:bg-primary-hover shadow-glow"
                  leftIcon={<Check className="h-4 w-4" />}
                >
                  Save Footer
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#1E293B] border border-slate-800/80 p-5 col-span-1 md:col-span-2">
                  <h3 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2">Branding Text</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Narrative Summary</label>
                      <textarea
                        value={footerData.narrativeText}
                        onChange={(e) => setFooterData({...footerData, narrativeText: e.target.value})}
                        className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-primary/50"
                        rows={2}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Copyright Text</label>
                      <input
                        value={footerData.copyrightText}
                        onChange={(e) => setFooterData({...footerData, copyrightText: e.target.value})}
                        className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-primary/50"
                      />
                    </div>
                  </div>
                </Card>

                {footerData.columns.map((col, colIdx) => (
                  <Card key={colIdx} className="bg-[#1E293B] border border-slate-800/80 p-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 border-b border-slate-800 pb-3">
                      <label className="text-xs font-semibold text-slate-400">Column {colIdx + 1} Title</label>
                      <input
                        value={col.title}
                        onChange={(e) => {
                          const newCols = [...footerData.columns];
                          newCols[colIdx].title = e.target.value;
                          setFooterData({...footerData, columns: newCols});
                        }}
                        className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-400">Links</label>
                        <button 
                          onClick={() => {
                            const newCols = [...footerData.columns];
                            newCols[colIdx].links.push({ name: "New Link", href: "/" });
                            setFooterData({...footerData, columns: newCols});
                          }}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700 text-slate-300"
                        >
                          + Add Link
                        </button>
                      </div>
                      
                      {col.links.map((link, linkIdx) => (
                        <div key={linkIdx} className="flex gap-2 items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                          <div className="flex flex-col gap-2 flex-grow">
                            <input
                              value={link.name}
                              placeholder="Link Name"
                              onChange={(e) => {
                                const newCols = [...footerData.columns];
                                newCols[colIdx].links[linkIdx].name = e.target.value;
                                setFooterData({...footerData, columns: newCols});
                              }}
                              className="w-full px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-white"
                            />
                            <input
                              value={link.href}
                              placeholder="URL (/path or https://)"
                              onChange={(e) => {
                                const newCols = [...footerData.columns];
                                newCols[colIdx].links[linkIdx].href = e.target.value;
                                setFooterData({...footerData, columns: newCols});
                              }}
                              className="w-full px-2 py-1 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono"
                            />
                          </div>
                          <button 
                            onClick={() => {
                              const newCols = [...footerData.columns];
                              newCols[colIdx].links.splice(linkIdx, 1);
                              setFooterData({...footerData, columns: newCols});
                            }}
                            className="p-1.5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
