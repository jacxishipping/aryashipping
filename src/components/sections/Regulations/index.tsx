"use client";

import { useState } from "react";
import { FileText, FileCheck, Landmark, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "export", label: "US/Canada Export", icon: FileText },
  { id: "auction", label: "Auction Direct", icon: FileCheck },
  { id: "import", label: "Afghan Import", icon: Landmark },
];

const CONTENT = {
  export: {
    title: "US & Canadian Export Compliance",
    desc: "Rigorous adherence to North American export regulations ensures your vehicle leaves the port without delay.",
    items: [
      { title: "Title Clearance", text: "Verification of clean, salvage, or export-only titles before dispatch." },
      { title: "Lien Release Verification", text: "Ensuring all financial holds are legally cleared prior to booking." },
      { title: "Export Declarations (AES)", text: "Filing mandatory Automated Export System declarations with US Customs and Border Protection." },
    ]
  },
  auction: {
    title: "Auction Direct Logistics",
    desc: "Seamless integration with major North American salvage and clean title auctions.",
    items: [
      { title: "Automatic Gate Passes", text: "Digital processing of release forms for Copart, IAAI, and Manheim." },
      { title: "Storage Mitigation", text: "Rapid dispatch to avoid auction storage fees and penalties." },
      { title: "Condition Verification", text: "Visual confirmation and documentation at the time of pickup." },
    ]
  },
  import: {
    title: "Afghan Import Guidelines",
    desc: "Navigating complex final-destination customs with local expertise and established protocols.",
    items: [
      { title: "Vehicle Age Restrictions", text: "Guidance on acceptable model years for legal import into Afghanistan." },
      { title: "Duty Documentation", text: "Preparation of commercial invoices and transit documents for customs valuation." },
      { title: "Dry Port Clearance", text: "Efficient processing at key inland customs depots (Kabul, Herat, Kandahar)." },
    ]
  }
};

export default function Regulations() {
  const [activeTab, setActiveTab] = useState<keyof typeof CONTENT>("export");

  return (
    <section id="regulations" className="py-24 bg-brand-obsidian relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12">
           {/* Sidebar Navigation */}
           <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-slate mb-8">
                Regulatory & Documentation Guide
              </h2>

              <div className="space-y-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as keyof typeof CONTENT)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 border text-left",
                        isActive
                          ? "bg-brand-navy border-brand-gold text-brand-gold"
                          : "bg-transparent border-brand-navy/30 text-brand-slate/70 hover:border-brand-navy hover:bg-brand-navy/20 hover:text-brand-slate"
                      )}
                    >
                      <span className="flex items-center gap-3 font-medium">
                        <Icon size={18} className={isActive ? "text-brand-gold" : "text-brand-slate/50"} />
                        {tab.label}
                      </span>
                      <ChevronRight size={16} className={cn(
                        "transition-transform",
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      )} />
                    </button>
                  );
                })}
              </div>
           </div>

           {/* Content Area */}
           <div className="md:w-2/3 bg-brand-navy/10 border border-brand-navy rounded-xl p-8 md:p-10 relative overflow-hidden min-h-[450px]">
              {/* Background watermark icon */}
              <div className="absolute -bottom-10 -right-10 text-brand-navy/30 pointer-events-none">
                 <FileText size={240} />
              </div>

              <div className="relative z-10">
                 <h3 className="text-2xl font-heading font-semibold text-brand-gold mb-3">
                   {CONTENT[activeTab].title}
                 </h3>
                 <p className="text-brand-slate/80 text-lg mb-8 pb-8 border-b border-brand-navy/50">
                   {CONTENT[activeTab].desc}
                 </p>

                 <div className="space-y-6">
                   {CONTENT[activeTab].items.map((item, i) => (
                     <div key={i} className="group">
                        <h4 className="text-brand-slate font-medium mb-2 group-hover:text-brand-gold transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          {item.title}
                        </h4>
                        <p className="text-brand-slate/60 text-sm pl-4 border-l border-brand-navy ml-0.5">
                          {item.text}
                        </p>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
