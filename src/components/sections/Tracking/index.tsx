"use client";

import { useState } from "react";
import { Search, Package, Ship, Building2, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the tracking simulation
const MOCK_TIMELINE = [
  { id: 1, title: "Dispatched from Auction", location: "Copart NY, USA", date: "Oct 12, 2026", status: "completed", icon: Building2 },
  { id: 2, title: "Port Terminal Received", location: "New York Port", date: "Oct 15, 2026", status: "completed", icon: Package },
  { id: 3, title: "Ocean Transit", location: "Atlantic Ocean", date: "Oct 18, 2026", status: "active", icon: Ship },
  { id: 4, title: "Customs Clearance", location: "Mersin, Turkey", date: "Pending", status: "pending", icon: CheckCircle2 },
  { id: 5, title: "In Transit to Destination", location: "Overland Route", date: "Pending", status: "pending", icon: ArrowRight },
  { id: 6, title: "Ready for Release", location: "Kabul Customs, AFG", date: "Pending", status: "pending", icon: MapPin },
];

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsSearching(true);
    setHasSearched(false);

    // Simulate network request
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1200);
  };

  return (
    <section id="tracking" className="py-24 bg-brand-obsidian relative border-b border-brand-navy">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-slate mb-6">
              Live Fleet Transparency
            </h2>
            <p className="text-brand-slate/70 text-lg mb-8">
              Monitor your asset&apos;s journey with military precision. Enter your VIN or Booking Bill of Lading (B/L) to inspect real-time milestones.
            </p>

            <form onSubmit={handleSearch} className="relative mt-4">
              <input
                type="text"
                placeholder="Try 'AAS-2026-DXB' or VIN..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full bg-transparent border-b-2 border-brand-navy focus:border-brand-gold text-brand-slate px-0 pb-4 text-2xl rounded-none outline-none font-mono transition-colors placeholder:text-brand-slate/30"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-0 bottom-4 px-6 py-2 bg-brand-gold text-brand-obsidian font-bold rounded flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-70"
              >
                {isSearching ? "Searching..." : <><Search size={18} /> Track</>}
              </button>
            </form>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
             <div className="bg-brand-navy/20 border border-brand-navy p-6 rounded-lg text-center">
                <Ship className="mx-auto mb-3 text-brand-gold" size={24} />
                <p className="font-mono text-xl text-brand-slate">24/7</p>
                <p className="text-xs text-brand-slate/50 uppercase tracking-wider mt-1">Satellite Tracking</p>
             </div>
             <div className="bg-brand-navy/20 border border-brand-navy p-6 rounded-lg text-center">
                <CheckCircle2 className="mx-auto mb-3 text-brand-gold" size={24} />
                <p className="font-mono text-xl text-brand-slate">100%</p>
                <p className="text-xs text-brand-slate/50 uppercase tracking-wider mt-1">Chain of Custody</p>
             </div>
          </div>
        </div>

        {/* Tracking Results Area */}
        <div className={cn(
          "transition-all duration-700 ease-in-out transform origin-top",
          hasSearched ? "opacity-100 scale-y-100 h-auto mt-12" : "opacity-0 scale-y-0 h-0 overflow-hidden"
        )}>
           <div className="bg-brand-navyDark/40 border border-brand-navy rounded-xl p-8">
              <div className="flex justify-between items-end border-b border-brand-navy pb-6 mb-8">
                 <div>
                   <p className="text-sm text-brand-slate/50 uppercase tracking-wider mb-1">Consignment</p>
                   <p className="text-2xl font-mono text-brand-gold">{trackingId.toUpperCase() || "AAS-2026-DXB"}</p>
                 </div>
                 <div className="text-right hidden sm:block">
                   <p className="text-sm text-brand-slate/50 uppercase tracking-wider mb-1">Status</p>
                   <p className="text-lg font-medium text-brand-slate flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                     In Transit (Ocean)
                   </p>
                 </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-brand-navy" />

                <div className="space-y-8">
                  {MOCK_TIMELINE.map((step) => {
                    const Icon = step.icon;
                    const isActive = step.status === "active";
                    const isCompleted = step.status === "completed";

                    return (
                      <div key={step.id} className={cn("relative flex gap-6 z-10", !isCompleted && !isActive && "opacity-40")}>
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-brand-obsidian",
                          isCompleted ? "border-brand-gold text-brand-gold" :
                          isActive ? "border-brand-gold text-brand-obsidian bg-brand-gold" :
                          "border-brand-navy text-brand-slate/50"
                        )}>
                          <Icon size={20} />
                        </div>

                        <div className="flex-1 pt-2 md:flex justify-between">
                          <div>
                            <h4 className={cn("font-heading font-semibold text-lg", isActive ? "text-brand-gold" : "text-brand-slate")}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-brand-slate/60 mt-1 flex items-center gap-1">
                               <MapPin size={14} /> {step.location}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 md:text-right">
                             <p className="font-mono text-sm text-brand-slate/80">{step.date}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
