"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Anchor, MapPin } from "lucide-react";
import WebGLCanvas from "./WebGLCanvas";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 1.5, // Wait for preloader to finish
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] w-full flex items-center pt-20 overflow-hidden">
      {/* 3D Background */}
      <WebGLCanvas />

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="max-w-2xl">
          <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-navyDark bg-brand-obsidian/50 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs tracking-widest text-brand-slate uppercase font-medium">Awwwards-Caliber Digital Experience</span>
          </div>

          <h1 className="hero-element text-5xl md:text-7xl font-heading font-bold text-brand-slate leading-[1.1] mb-6">
            Precision Automotive Logistics: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#e8c660]">
              North America to Afghanistan
            </span>
          </h1>

          <p className="hero-element text-lg md:text-xl text-brand-slate/80 font-body max-w-xl mb-10 leading-relaxed">
            Seamless port-to-destination vehicle transport via strategic hubs in Mersin and Dubai. Fully insured, end-to-end tracked.
          </p>

          <div className="hero-element flex flex-col sm:flex-row gap-4">
            <a
              href="#calculator"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-obsidian font-bold tracking-wide rounded-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Calculate Transit & Quote
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
              href="#tracking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-navyDark hover:border-brand-gold/50 text-brand-slate bg-brand-obsidian/40 backdrop-blur-sm rounded-sm transition-colors duration-300"
            >
              <Anchor size={18} className="text-brand-gold" />
              <span className="font-medium tracking-wide">Track Vehicle</span>
            </a>
          </div>

          {/* Stats quick view */}
          <div className="hero-element mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-brand-navyDark/50">
            <div>
              <p className="font-mono text-2xl text-brand-slate">15,000+</p>
              <p className="text-xs text-brand-slate/60 uppercase tracking-wider mt-1">Vehicles Delivered</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-brand-slate">99.6%</p>
              <p className="text-xs text-brand-slate/60 uppercase tracking-wider mt-1">Safe Arrival Rate</p>
            </div>
            <div className="hidden md:block">
              <p className="font-mono text-2xl text-brand-slate">38-48</p>
              <p className="text-xs text-brand-slate/60 uppercase tracking-wider mt-1">Days Avg Transit</p>
            </div>
          </div>
        </div>

        {/* Floating Quick Route Card (Visual element for Hero) */}
        <div className="hero-element hidden lg:block justify-self-end">
          <div className="w-[320px] bg-brand-obsidian/60 backdrop-blur-md border border-brand-navyDark rounded-lg p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy opacity-50" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest mb-1">Active Route</p>
                <h3 className="font-heading font-semibold text-brand-slate">New York (NY)</h3>
              </div>
              <MapPin size={18} className="text-brand-slate/40" />
            </div>

            <div className="relative pl-4 border-l border-brand-navy/50 space-y-4 py-2 my-2">
               <div className="absolute -left-1 top-2 w-2 h-2 rounded-full bg-brand-slate" />
               <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-brand-gold bg-brand-obsidian" />
               <div className="absolute -left-1 bottom-2 w-2 h-2 rounded-full bg-brand-slate" />

               <div>
                  <p className="text-xs text-brand-slate/60">Transshipment Hub</p>
                  <p className="font-mono text-sm text-brand-slate">Mersin (TR)</p>
               </div>
            </div>

            <div className="flex justify-between items-end mt-6 pt-4 border-t border-brand-navyDark/50">
              <div>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest mb-1">Destination</p>
                <h3 className="font-heading font-semibold text-brand-slate">Kabul (AFG)</h3>
              </div>
              <div className="text-right">
                 <p className="text-xs text-brand-slate/60">Est. Transit</p>
                 <p className="font-mono text-brand-slate">42 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
