"use client";

import { useState } from "react";
import { Calculator as CalculatorIcon, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ORIGINS = ["USA - East Coast", "USA - West Coast", "Canada - East", "Canada - West"];
const HUBS = ["Copart", "IAAI", "Manheim", "Private Address"];
const TRANSIT_ROUTES = ["Via Mersin (Turkey)", "Via Dubai (UAE)"];
const DESTINATIONS = ["Kabul", "Herat", "Kandahar", "Mazar-i-Sharif"];

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<null | { time: string; rate: string }>(null);

  const [formData, setFormData] = useState({
    origin: "",
    hub: "",
    route: "",
    destination: "",
  });

  const handleSelect = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      if (step < 4) setStep(step + 1);
    }, 300);
  };

  const calculateQuote = () => {
    setIsCalculating(true);
    // Simulate API call
    setTimeout(() => {
      // Mock dynamic logic
      const isMersin = formData.route.includes("Mersin");
      const baseDays = isMersin ? 35 : 42;
      const days = baseDays + Math.floor(Math.random() * 8);

      setResult({
        time: `${days} - ${days + 5} Days`,
        rate: isMersin ? "$3,200 - $3,800" : "$2,900 - $3,500" // Mock tiers
      });
      setIsCalculating(false);
      setStep(5);
    }, 1500);
  };

  const reset = () => {
    setStep(1);
    setResult(null);
    setFormData({ origin: "", hub: "", route: "", destination: "" });
  };

  return (
    <section id="calculator" className="py-24 bg-brand-obsidian relative border-b border-brand-navy">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-navy rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-navy bg-brand-obsidian mb-6">
            <CalculatorIcon size={16} className="text-brand-gold" />
            <span className="text-xs tracking-widest text-brand-slate uppercase font-medium">Quick Quote</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-slate mb-6">
            Rate & Transit Estimator
          </h2>
          <p className="text-brand-slate/70 text-lg">
            Plan your logistics with precision. Select your route parameters to instantly generate estimated transit windows and baseline rate tiers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-obsidian/80 backdrop-blur-xl border border-brand-navy rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
           {/* Progress Line */}
           <div className="absolute top-0 left-0 w-full h-1 bg-brand-navy">
             <div
               className="h-full bg-brand-gold transition-all duration-500 ease-out"
               style={{ width: `${(step / 5) * 100}%` }}
             />
           </div>

           {step < 5 ? (
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h3 className="text-2xl font-heading font-semibold text-brand-slate mb-2">
                    {step === 1 && "Select Origin Region"}
                    {step === 2 && "Select Pickup Hub"}
                    {step === 3 && "Select Transit Route"}
                    {step === 4 && "Select Final Destination"}
                  </h3>
                  <p className="text-brand-slate/60 text-sm mb-8">Step {step} of 4</p>

                  <div className="space-y-3">
                    {(step === 1 ? ORIGINS : step === 2 ? HUBS : step === 3 ? TRANSIT_ROUTES : DESTINATIONS).map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(
                          step === 1 ? "origin" : step === 2 ? "hub" : step === 3 ? "route" : "destination",
                          option
                        )}
                        className="w-full text-left px-6 py-4 rounded-lg border border-brand-navy bg-brand-obsidian/50 hover:border-brand-gold hover:bg-brand-navy/30 transition-all group flex items-center justify-between"
                      >
                        <span className="font-medium text-brand-slate group-hover:text-brand-gold transition-colors">{option}</span>
                        <ArrowRight size={16} className="text-brand-slate/40 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
               </div>

               {/* Summary Panel */}
               <div className="bg-brand-navy/20 border border-brand-navy rounded-lg p-6 h-full flex flex-col justify-between">
                 <div>
                   <h4 className="text-sm uppercase tracking-widest text-brand-gold mb-6 font-semibold">Route Summary</h4>
                   <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-brand-navy/50">
                      {[
                        { label: "Origin", value: formData.origin, stepNum: 1 },
                        { label: "Hub", value: formData.hub, stepNum: 2 },
                        { label: "Transit", value: formData.route, stepNum: 3 },
                        { label: "Destination", value: formData.destination, stepNum: 4 },
                      ].map((item) => (
                        <div key={item.label} className={cn("relative pl-8 transition-opacity duration-300", step >= item.stepNum ? "opacity-100" : "opacity-30")}>
                          <div className={cn("absolute left-[3px] top-1.5 w-2 h-2 rounded-full -translate-x-1/2", item.value ? "bg-brand-gold" : "bg-brand-slate/30")} />
                          <p className="text-xs text-brand-slate/50 uppercase tracking-wider">{item.label}</p>
                          <p className="font-medium text-brand-slate mt-1">{item.value || "—"}</p>
                        </div>
                      ))}
                   </div>
                 </div>

                 {step === 4 && formData.destination && (
                   <button
                     onClick={calculateQuote}
                     disabled={isCalculating}
                     className="mt-8 w-full py-4 bg-brand-gold text-brand-obsidian font-bold rounded hover:bg-white transition-colors flex items-center justify-center gap-2"
                   >
                     {isCalculating ? (
                       <Loader2 size={18} className="animate-spin" />
                     ) : (
                       <>Calculate Route <ArrowRight size={18} /></>
                     )}
                   </button>
                 )}
               </div>
             </div>
           ) : (
             // Result View
             <div className="text-center max-w-2xl mx-auto py-8">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
                 <CheckCircle2 size={32} />
               </div>
               <h3 className="text-3xl font-heading font-bold text-brand-slate mb-2">Estimation Complete</h3>
               <p className="text-brand-slate/60 mb-8">Based on your selected parameters.</p>

               <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
                 <div className="bg-brand-navy/30 border border-brand-navy rounded-lg p-6">
                   <p className="text-sm text-brand-slate/60 uppercase tracking-wider mb-2">Est. Transit Time</p>
                   <p className="text-3xl font-mono text-brand-slate">{result?.time}</p>
                 </div>
                 <div className="bg-brand-navy/30 border border-brand-navy rounded-lg p-6">
                   <p className="text-sm text-brand-slate/60 uppercase tracking-wider mb-2">Base Rate Tier (USD)</p>
                   <p className="text-3xl font-mono text-brand-gold">{result?.rate}</p>
                   <p className="text-xs text-brand-slate/40 mt-2">*Excludes final duties</p>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button className="px-8 py-4 bg-brand-gold text-brand-obsidian font-bold rounded hover:bg-white transition-colors">
                   Request Official Quote
                 </button>
                 <button onClick={reset} className="px-8 py-4 border border-brand-navy text-brand-slate hover:bg-brand-navy/30 rounded transition-colors">
                   Recalculate
                 </button>
               </div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
}
