"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Plus, RefreshCw, Layers, CheckCircle2, TrendingUp, DollarSign, 
  Users, ShoppingBag, Calendar, Activity, Database, Sparkles, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productKey: string | null;
  productName: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  productKey,
  productName,
}) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lead CRM state
  const [leads, setLeads] = useState([
    { id: 1, name: "Acme Corp", source: "Website", status: "Proposal Sent", value: "$4,500" },
    { id: 2, name: "David Miller", source: "Google Maps", status: "Contacted", value: "$1,200" },
    { id: 3, name: "Sarah Jenkins", source: "Direct Referral", status: "Deal Closed", value: "$8,900" },
  ]);
  const [newLeadName, setNewLeadName] = useState("");

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;
    setLeads([
      ...leads,
      {
        id: Date.now(),
        name: newLeadName,
        source: "Live Demo",
        status: "Contacted",
        value: `$${Math.floor(Math.random() * 5000) + 1000}`,
      },
    ]);
    setNewLeadName("");
  };

  // Billing states
  const [invoices, setInvoices] = useState([
    { id: "INV-8831", client: "Quantum Tech", date: "2026-07-14", amount: "$1,850.00", status: "Paid" },
    { id: "INV-8832", client: "Helix Media", date: "2026-07-12", amount: "$3,400.00", status: "Pending" },
    { id: "INV-8833", client: "Apex Retail", date: "2026-07-10", amount: "$890.00", status: "Overdue" },
  ]);
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");

  const createInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount) return;
    setInvoices([
      {
        id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
        client: clientName,
        date: new Date().toISOString().split("T")[0],
        amount: `$${parseFloat(amount).toFixed(2)}`,
        status: "Pending",
      },
      ...invoices,
    ]);
    setClientName("");
    setAmount("");
  };

  // Inventory states
  const [inventory, setInventory] = useState([
    { id: 1, item: "Opal Pendant Gold", sku: "JWL-OP-01", stock: 12, minStock: 5 },
    { id: 2, item: "Ruby Hoop Earrings", sku: "JWL-RB-05", stock: 4, minStock: 6 },
    { id: 3, item: "Silver Band Ring", sku: "JWL-SR-22", stock: 25, minStock: 10 },
  ]);

  const updateStock = (id: number, delta: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  // Booking states
  const [bookings, setBookings] = useState([
    { id: 1, time: "09:00 AM", client: "Marcus Vance", type: "First Strategy Diagnosis" },
    { id: 2, time: "11:30 AM", client: "Starlight Inc", type: "Custom Dashboard Review" },
    { id: 3, time: "03:00 PM", client: "Sophia Loren", type: "API Automation Integration" },
  ]);
  const [bookingTime, setBookingTime] = useState("");
  const [bookingClient, setBookingClient] = useState("");

  const addBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingTime || !bookingClient) return;
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        time: bookingTime,
        client: bookingClient,
        type: "Onboarding Intake Session",
      },
    ].sort((a, b) => a.time.localeCompare(b.time)));
    setBookingTime("");
    setBookingClient("");
  };

  // Attendance states
  const [attendance, setAttendance] = useState([
    { id: 1, employee: "Alex Carter", status: "Clocked In", time: "08:52 AM" },
    { id: 2, employee: "Priya Sharma", status: "Late", time: "09:18 AM" },
    { id: 3, employee: "Liam O'Connor", status: "Off-duty", time: "--" },
  ]);

  const toggleCheckIn = (id: number) => {
    setAttendance(
      attendance.map((emp) => {
        if (emp.id === id) {
          const currentIn = emp.status === "Clocked In" || emp.status === "Late";
          return {
            ...emp,
            status: currentIn ? "Off-duty" : "Clocked In",
            time: currentIn ? "--" : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return emp;
      })
    );
  };

  // BI Dashboard state (SVG charts updates based on selected Month)
  const [selectedMonth, setSelectedMonth] = useState("July");
  const chartData: Record<string, { revenue: number[]; leads: number; efficiency: number }> = {
    May: { revenue: [12, 18, 14, 22], leads: 84, efficiency: 74 },
    June: { revenue: [15, 24, 20, 28], leads: 112, efficiency: 82 },
    July: { revenue: [18, 32, 25, 41], leads: 168, efficiency: 91 },
  };

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-neutral-bg border border-slate-200 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
          >
            {/* Sidebar (Simulated SaaS Navigation) */}
            <div className="w-full md:w-56 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
              <div className="flex flex-col gap-6">
                
                {/* Simulated Portal Brand */}
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                  <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-white">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-display text-sm font-bold text-white tracking-wide">
                    HeyGrow Console
                  </span>
                </div>

                {/* Sidebar Navigation Options */}
                <div className="flex flex-col gap-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Product Simulation
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-primary/25 border border-primary/20 text-primary-tint font-bold text-xs flex items-center gap-2">
                    <Database className="h-3.5 w-3.5" />
                    {productName}
                  </span>
                  <span className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2 cursor-not-allowed">
                    <Layers className="h-3.5 w-3.5" /> Live Data logs
                  </span>
                  <span className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2 cursor-not-allowed">
                    <Sparkles className="h-3.5 w-3.5" /> AI Autopilot
                  </span>
                </div>

              </div>

              {/* Status bar */}
              <div className="text-[10px] text-slate-500 flex flex-col gap-1 border-t border-slate-800 pt-4 mt-4 md:mt-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Sandbox Environment</span>
                </div>
                <span>Sync status: Completed</span>
              </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="flex-grow flex flex-col min-w-0">
              
              {/* Header */}
              <div className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="font-display text-lg font-bold text-secondary">
                    {productName} Sandbox
                  </h3>
                  <p className="text-xs text-neutral-muted">
                    Test the features live. These simulations run directly on state machines.
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-secondary transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Interactive Dashboard Workspace */}
              <div className="flex-grow p-6 overflow-y-auto bg-white">

                {/* 1. CRM MOCKUP */}
                {productKey === "crm" && (
                  <div className="flex flex-col gap-6 h-full">
                    {/* CRM Mini Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Conversion Rate</span>
                        <span className="text-lg font-extrabold text-secondary block mt-0.5">68%</span>
                      </div>
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Active Pipeline</span>
                        <span className="text-lg font-extrabold text-secondary block mt-0.5">$14,600</span>
                      </div>
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">AI Autopilot Status</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full inline-block mt-1">Ready</span>
                      </div>
                    </div>

                    {/* Leads Management Form */}
                    <form onSubmit={addLead} className="flex gap-2 items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <input
                        type="text"
                        placeholder="Add client lead name (e.g. Orion Labs)"
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                        className="flex-grow px-3 py-1.5 text-sm bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary"
                      />
                      <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="h-4 w-4" />}>
                        Add Lead
                      </Button>
                    </form>

                    {/* Active Pipeline Table */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden flex-grow min-h-[180px]">
                      <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead className="bg-slate-50 text-neutral-muted border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Client Name</th>
                            <th className="p-3.5">Source</th>
                            <th className="p-3.5 text-center">Status</th>
                            <th className="p-3.5 text-right">Pipeline Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-secondary font-medium">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5">{lead.name}</td>
                              <td className="p-3.5 text-neutral-muted">{lead.source}</td>
                              <td className="p-3.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  lead.status === "Deal Closed" 
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                    : lead.status === "Proposal Sent" 
                                    ? "bg-blue-50 text-blue-700 border-blue-200" 
                                    : "bg-slate-100 text-neutral-muted border-slate-200"
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right font-bold text-secondary">{lead.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. BILLING MOCKUP */}
                {productKey === "billing" && (
                  <div className="flex flex-col gap-6 h-full">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Invoiced Total</span>
                        <span className="text-lg font-extrabold text-secondary block mt-0.5">$6,140.00</span>
                      </div>
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Pending Invoices</span>
                        <span className="text-lg font-extrabold text-secondary block mt-0.5">$3,400.00</span>
                      </div>
                      <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Collection Rate</span>
                        <span className="text-lg font-extrabold text-emerald-600 block mt-0.5">86%</span>
                      </div>
                    </div>

                    {/* Invoice Generator form */}
                    <form onSubmit={createInvoice} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary"
                      />
                      <input
                        type="number"
                        placeholder="Invoice Amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary"
                      />
                      <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="h-4 w-4" />}>
                        Generate Invoice
                      </Button>
                    </form>

                    {/* Invoice ledger */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden flex-grow min-h-[180px]">
                      <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead className="bg-slate-50 text-neutral-muted border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Invoice ID</th>
                            <th className="p-3.5">Client</th>
                            <th className="p-3.5">Date Created</th>
                            <th className="p-3.5 text-right">Invoice Value</th>
                            <th className="p-3.5 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-secondary font-medium">
                          {invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5 font-bold text-neutral-muted">{inv.id}</td>
                              <td className="p-3.5">{inv.client}</td>
                              <td className="p-3.5 text-neutral-muted">{inv.date}</td>
                              <td className="p-3.5 text-right font-bold">{inv.amount}</td>
                              <td className="p-3.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  inv.status === "Paid" 
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                    : inv.status === "Pending" 
                                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                }`}>
                                  {inv.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. INVENTORY MOCKUP */}
                {productKey === "inventory" && (
                  <div className="flex flex-col gap-6 h-full">
                    {/* Alert Banner if any stock is low */}
                    {inventory.some(item => item.stock < item.minStock) && (
                      <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                        <span>Warning: Certain inventory lines have fallen below minimum thresholds. Auto-reorder triggers scheduled.</span>
                      </div>
                    )}

                    <div className="border border-slate-100 rounded-xl overflow-hidden flex-grow min-h-[180px]">
                      <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead className="bg-slate-50 text-neutral-muted border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Product Name</th>
                            <th className="p-3.5">SKU</th>
                            <th className="p-3.5 text-center">Stock Count</th>
                            <th className="p-3.5 text-center">Min Threshold</th>
                            <th className="p-3.5 text-center">Control State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-secondary font-medium">
                          {inventory.map((item) => {
                            const isLow = item.stock < item.minStock;
                            return (
                              <tr key={item.id} className={`hover:bg-slate-50/50 ${isLow ? "bg-rose-50/10" : ""}`}>
                                <td className="p-3.5 font-bold">{item.item}</td>
                                <td className="p-3.5 text-neutral-muted font-mono">{item.sku}</td>
                                <td className="p-3.5 text-center font-bold">
                                  <span className={`px-2 py-0.5 rounded ${isLow ? "text-rose-600 bg-rose-50 font-extrabold" : ""}`}>
                                    {item.stock} units
                                  </span>
                                </td>
                                <td className="p-3.5 text-center text-neutral-muted">{item.minStock} units</td>
                                <td className="p-3.5 text-center">
                                  <div className="inline-flex gap-1.5">
                                    <button
                                      onClick={() => updateStock(item.id, -1)}
                                      className="h-7 w-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-200 text-secondary cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <button
                                      onClick={() => updateStock(item.id, 1)}
                                      className="h-7 w-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-200 text-secondary cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. BOOKING MOCKUP */}
                {productKey === "booking" && (
                  <div className="flex flex-col gap-6 h-full">
                    {/* Setup schedule form */}
                    <form onSubmit={addBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary cursor-pointer"
                      >
                        <option value="">Select Time Slot</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={bookingClient}
                        onChange={(e) => setBookingClient(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-primary/50 text-secondary"
                      />
                      <Button variant="primary" size="sm" type="submit" leftIcon={<Calendar className="h-4 w-4" />}>
                        Reserve Slot
                      </Button>
                    </form>

                    {/* Booking schedule list */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden flex-grow min-h-[180px]">
                      <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead className="bg-slate-50 text-neutral-muted border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Time Schedule</th>
                            <th className="p-3.5">Client Record</th>
                            <th className="p-3.5">Session Type</th>
                            <th className="p-3.5 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-secondary font-medium">
                          {bookings.map((book) => (
                            <tr key={book.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5 font-bold text-primary">{book.time}</td>
                              <td className="p-3.5 font-bold">{book.client}</td>
                              <td className="p-3.5 text-neutral-muted">{book.type}</td>
                              <td className="p-3.5 text-center">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                                  Confirmed
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. ATTENDANCE MOCKUP */}
                {productKey === "attendance" && (
                  <div className="flex flex-col gap-6 h-full">
                    <div className="border border-slate-100 rounded-xl overflow-hidden flex-grow min-h-[180px]">
                      <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead className="bg-slate-50 text-neutral-muted border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Team Member</th>
                            <th className="p-3.5 text-center">Punch Status</th>
                            <th className="p-3.5 text-center">Check-in Stamp</th>
                            <th className="p-3.5 text-center">Action Trigger</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-secondary font-medium">
                          {attendance.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5 font-bold">{emp.employee}</td>
                              <td className="p-3.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  emp.status === "Clocked In" 
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                    : emp.status === "Late" 
                                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                                    : "bg-slate-100 text-neutral-muted border-slate-200"
                                }`}>
                                  {emp.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-center font-mono text-neutral-muted">{emp.time}</td>
                              <td className="p-3.5 text-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleCheckIn(emp.id)}
                                  className="h-8 py-0 px-3 cursor-pointer text-xs"
                                >
                                  {emp.status === "Clocked In" || emp.status === "Late" ? "Clock Out" : "Clock In"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 6. BI DASHBOARD MOCKUP */}
                {productKey === "dashboard" && (
                  <div className="flex flex-col gap-6 h-full">
                    {/* Month selector tabs */}
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 shrink-0">
                      <span className="text-xs font-bold text-neutral-muted mr-3">Select Operations Period:</span>
                      {["May", "June", "July"].map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMonth(m)}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            selectedMonth === m
                              ? "bg-primary text-white border-primary"
                              : "bg-slate-50 border-slate-200 text-neutral-muted hover:bg-slate-100"
                          }`}
                        >
                          {m} 2026
                        </button>
                      ))}
                    </div>

                    {/* Dashboard charts & metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border border-slate-100 p-4 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Month Sales Leads</span>
                        <span className="text-2xl font-extrabold text-secondary block mt-1">
                          {chartData[selectedMonth].leads} Leads
                        </span>
                      </div>
                      <div className="border border-slate-100 p-4 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Systems Efficiency</span>
                        <span className="text-2xl font-extrabold text-primary block mt-1">
                          {chartData[selectedMonth].efficiency}% uptime
                        </span>
                      </div>
                      <div className="border border-slate-100 p-4 rounded-xl bg-slate-50">
                        <span className="text-[10px] font-bold uppercase text-neutral-muted block">Sales Performance</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full inline-block mt-2">
                          Steady Increase
                        </span>
                      </div>
                    </div>

                    {/* SVG Chart Display */}
                    <div className="border border-slate-100 p-6 rounded-xl bg-slate-50/50 flex-grow min-h-[160px] flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                          Revenue Operations Trend ($ thousands)
                        </span>
                        <span className="text-xs font-bold text-secondary">
                          Projected Revenue: ${chartData[selectedMonth].revenue.reduce((a, b) => a + b, 0)}k
                        </span>
                      </div>

                      <div className="flex-grow flex items-end gap-6 md:gap-12 h-36 border-b border-slate-200 pb-2">
                        {chartData[selectedMonth].revenue.map((val, idx) => (
                          <div key={idx} className="flex-grow flex flex-col items-center gap-1.5 h-full justify-end">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(val / 50) * 100}%` }}
                              transition={{ duration: 0.5 }}
                              className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-primary to-teal-500 shadow-sm"
                            />
                            <span className="text-[10px] font-bold text-secondary">W{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
              {/* Footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between shrink-0">
                <span className="text-[11px] text-neutral-muted">
                  Interactive Sandbox model is for visualization. Full deployment installs this within your private database context.
                </span>
                <Button variant="primary" size="sm" onClick={onClose}>
                  Complete Demo
                </Button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
