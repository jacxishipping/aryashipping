"use client";

import { MessageCircle, FileSpreadsheet, Anchor, ArrowUp, Building2, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const OFFICES = [
  { name: "USA Operations", address: "140 Broadway, Suite 4600, New York, NY", phone: "+1 (212) 555-0198", email: "usa@aryaaziz.com" },
  { name: "Dubai Hub", address: "Jafza One, Jebel Ali Free Zone, Dubai, UAE", phone: "+971 4 555 0122", email: "dxb@aryaaziz.com" },
  { name: "Afghan Headquarters", address: "Customs Road, District 9, Kabul, AFG", phone: "+93 20 255 0174", email: "kbl@aryaaziz.com" },
];

export default function Footer() {
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock when scrolling down past 500px
      setShowDock(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-brand-navyDark relative pt-24 pb-12 border-t border-brand-navy overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-brand-navy/30 rounded-[100%] blur-[120px] pointer-events-none" />

         <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
               {/* Brand Column */}
               <div className="lg:col-span-1">
                 <div className="flex flex-col mb-6">
                    <span className="font-heading font-bold text-2xl tracking-[0.15em] text-brand-slate uppercase">
                      Arya Aziz
                    </span>
                    <span className="text-xs tracking-widest text-brand-gold uppercase">
                      Shipping
                    </span>
                 </div>
                 <p className="text-brand-slate/60 text-sm leading-relaxed">
                    Precision automotive logistics from North America to Afghanistan. Awwwards-caliber digital transparency, real-world reliability.
                 </p>
               </div>

               {/* Offices */}
               <div className="lg:col-span-3 grid sm:grid-cols-3 gap-8">
                  {OFFICES.map((office) => (
                    <div key={office.name}>
                       <h4 className="text-brand-gold font-heading font-semibold mb-4 flex items-center gap-2">
                         <Building2 size={16} />
                         {office.name}
                       </h4>
                       <address className="not-italic text-sm text-brand-slate/70 space-y-3">
                          <p className="leading-relaxed">{office.address}</p>
                          <a href={`tel:${office.phone}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                             <Phone size={14} /> {office.phone}
                          </a>
                          <a href={`mailto:${office.email}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                             <Mail size={14} /> {office.email}
                          </a>
                       </address>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-navy/50 text-sm text-brand-slate/50">
               <p>&copy; {new Date().getFullYear()} Arya Aziz Shipping. All rights reserved.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-brand-gold transition-colors">Bill of Lading Terms</a>
               </div>
            </div>
         </div>
      </footer>

      {/* Floating Action Dock */}
      <div className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        showDock ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}>
         <div className="flex items-center gap-2 bg-brand-obsidian/90 backdrop-blur-xl border border-brand-navy rounded-full p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-brand-navy/40 transition-colors"
            >
               <MessageCircle size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" />
               <span className="text-sm font-medium text-brand-slate hidden sm:block">WhatsApp</span>
            </a>

            <div className="w-[1px] h-6 bg-brand-navy" />

            <a
              href="#calculator"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-brand-navy/40 transition-colors"
            >
               <FileSpreadsheet size={18} className="text-brand-gold group-hover:scale-110 transition-transform" />
               <span className="text-sm font-medium text-brand-slate hidden sm:block">Rate Sheet</span>
            </a>

            <div className="w-[1px] h-6 bg-brand-navy" />

            <a
              href="#tracking"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-brand-navy/40 transition-colors"
            >
               <Anchor size={18} className="text-brand-slate group-hover:scale-110 transition-transform" />
               <span className="text-sm font-medium text-brand-slate hidden sm:block">Track</span>
            </a>

            <button
              onClick={scrollToTop}
              className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-navy text-brand-slate hover:bg-brand-gold hover:text-brand-obsidian transition-colors"
              aria-label="Scroll to top"
            >
               <ArrowUp size={18} />
            </button>
         </div>
      </div>
    </>
  );
}
