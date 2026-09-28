"use client";

import { useState } from "react";
import { ShieldCheck, Shield, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Security() {
  const [activeTab, setActiveTab] = useState<"container" | "roro">("container");

  return (
    <section id="security" className="py-24 bg-brand-obsidian relative border-b border-brand-navy">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-slate mb-6">
            Security & Vehicle Care
          </h2>
          <p className="text-brand-slate/70 text-lg">
            We employ industry-leading lashing techniques and customized transport methodologies to ensure pristine delivery of high-value and operational assets alike.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-brand-navy/30 p-1 rounded-lg border border-brand-navy">
             <button
               onClick={() => setActiveTab("container")}
               className={cn(
                 "px-8 py-3 rounded-md font-medium text-sm transition-all duration-300",
                 activeTab === "container"
                   ? "bg-brand-gold text-brand-obsidian shadow-lg"
                   : "text-brand-slate/70 hover:text-brand-slate"
               )}
             >
               Containerized High-Cube
             </button>
             <button
               onClick={() => setActiveTab("roro")}
               className={cn(
                 "px-8 py-3 rounded-md font-medium text-sm transition-all duration-300",
                 activeTab === "roro"
                   ? "bg-brand-gold text-brand-obsidian shadow-lg"
                   : "text-brand-slate/70 hover:text-brand-slate"
               )}
             >
               Roll-on / Roll-off (Ro-Ro)
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
           {/* Container Content */}
           <div className={cn(
             "absolute inset-0 transition-all duration-500",
             activeTab === "container" ? "opacity-100 z-10 translate-y-0" : "opacity-0 z-0 pointer-events-none translate-y-4"
           )}>
              <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                 <div className="bg-brand-navy/10 border border-brand-navy rounded-xl p-8 h-full">
                    <ShieldCheck size={48} className="text-brand-gold mb-6" />
                    <h3 className="text-2xl font-heading font-semibold text-brand-slate mb-4">Maximum Protection</h3>
                    <p className="text-brand-slate/70 mb-8">
                      Ideal for exotics, salvage vehicles, and high-value cargo. Vehicles are securely loaded into enclosed 40ft high-cube containers.
                    </p>

                    <ul className="space-y-4">
                      {["Multi-point wheel blocking & strapping", "Desiccant moisture control systems", "Tamper-proof seal verification", "Accommodates non-operational vehicles"].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-brand-slate/90">
                           <Check size={20} className="text-brand-gold shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                 </div>

                 {/* Visual Representation */}
                 <div className="relative h-64 md:h-full min-h-[300px] border border-brand-navy rounded-xl overflow-hidden bg-brand-navyDark flex items-center justify-center">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                    <div className="relative z-10 text-center">
                       <p className="font-mono text-brand-gold text-sm tracking-widest uppercase mb-4 border border-brand-gold/30 inline-block px-4 py-1 rounded">Visual Simulation</p>
                       <h4 className="text-brand-slate font-heading text-xl opacity-50">Container Lashing System</h4>
                    </div>
                 </div>
              </div>
           </div>

           {/* Ro-Ro Content */}
           <div className={cn(
             "absolute inset-0 transition-all duration-500",
             activeTab === "roro" ? "opacity-100 z-10 translate-y-0" : "opacity-0 z-0 pointer-events-none translate-y-4"
           )}>
              <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                 <div className="bg-brand-navy/10 border border-brand-navy rounded-xl p-8 h-full">
                    <Shield size={48} className="text-brand-gold mb-6" />
                    <h3 className="text-2xl font-heading font-semibold text-brand-slate mb-4">Cost-Effective Efficiency</h3>
                    <p className="text-brand-slate/70 mb-8">
                      The premier choice for standard, operational vehicles and heavy machinery. Vehicles are driven directly onto specialized vessels.
                    </p>

                    <ul className="space-y-4">
                      {["Highly cost-effective for operational units", "Faster loading and discharge times", "Under-deck stowage protection from elements", "Ideal for oversized trucks and machinery"].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-brand-slate/90">
                           <Check size={20} className="text-brand-gold shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-3 text-brand-slate/50">
                         <X size={20} className="shrink-0 mt-0.5" />
                         <span>Not suitable for salvage/non-runners</span>
                      </li>
                    </ul>
                 </div>

                 {/* Visual Representation */}
                 <div className="relative h-64 md:h-full min-h-[300px] border border-brand-navy rounded-xl overflow-hidden bg-brand-navyDark flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0,transparent_70%)]" />
                    <div className="relative z-10 text-center">
                       <p className="font-mono text-brand-gold text-sm tracking-widest uppercase mb-4 border border-brand-gold/30 inline-block px-4 py-1 rounded">Visual Simulation</p>
                       <h4 className="text-brand-slate font-heading text-xl opacity-50">Ro-Ro Vessel Deck</h4>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
