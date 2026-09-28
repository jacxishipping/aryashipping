"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map, ArrowRight, Anchor, Truck } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    id: "phase-1",
    title: "North American Inland & Port Staging",
    desc: "Pickup from major auctions (Copart, IAAI, Manheim) or private addresses. Strategic loading into 40ft high-cube containers or Ro-Ro vessels.",
    icon: Truck,
  },
  {
    id: "phase-2",
    title: "Transatlantic & Arabian Sea Maritime Transit",
    desc: "Scheduled, high-frequency ocean freight departures from US East/West Coast and Canadian maritime hubs.",
    icon: Anchor,
  },
  {
    id: "phase-3",
    title: "Regional Clearance Hubs (Mersin / Dubai)",
    desc: "Mersin serves as the Mediterranean gateway, while Dubai/Jebel Ali provides high-frequency transshipment and rapid customs processing.",
    icon: Map,
  },
  {
    id: "phase-4",
    title: "Border Crossing & Final Delivery",
    desc: "Secure bonded overland transport into key Afghan customs dry ports with clear handover documentation.",
    icon: ArrowRight,
  },
];

export default function Corridors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Draw line down as we scroll
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Animate cards on scroll
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Subtle parallax on icons
      iconsRef.current.forEach((icon) => {
        if (!icon) return;
        gsap.to(icon, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: icon,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="corridors" className="py-24 bg-brand-obsidian relative border-b border-brand-navy" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-slate mb-6">
            The Corridors: Interactive Route Visualizer
          </h2>
          <p className="text-brand-slate/70 text-lg">
            A meticulously planned global logistics network connecting North America directly to inland Afghanistan via our specialized hubs.
          </p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-navy/30 -translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-[24px] md:left-1/2 top-0 w-[2px] bg-brand-gold -translate-x-1/2 origin-top"
            style={{ height: prefersReducedMotion ? "100%" : "0%" }}
          />

          <div className="space-y-16">
            {PHASES.map((phase, index) => {
              const Icon = phase.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={phase.id}
                  className={cn(
                    "relative flex items-center gap-8 md:gap-0",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Icon Node */}
                  <div
                    ref={(el) => { iconsRef.current[index] = el; }}
                    className="absolute left-[24px] md:left-1/2 w-12 h-12 rounded-full border-2 border-brand-gold bg-brand-obsidian text-brand-gold flex items-center justify-center -translate-x-1/2 z-10"
                  >
                    <Icon size={20} />
                  </div>

                  {/* Content Card */}
                  <div
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className={cn(
                    "ml-[60px] md:ml-0 md:w-[calc(50%-40px)] p-12 bg-brand-navy/5 border border-brand-navy/20 rounded-xl hover:border-brand-gold/30 transition-all duration-500 group relative overflow-hidden",
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                  )}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <p className="text-brand-gold text-sm font-mono tracking-widest uppercase mb-2">Phase {index + 1}</p>
                    <h3 className="text-2xl font-heading font-semibold text-brand-slate mb-4">
                      {phase.title}
                    </h3>
                    <p className="text-brand-slate/70">
                      {phase.desc}
                    </p>

                    {/* Micro-interaction data for Phase 3 */}
                    {index === 2 && (
                       <div className="mt-6 grid grid-cols-2 gap-4 border-t border-brand-navy/50 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div>
                             <p className="text-[10px] uppercase tracking-widest text-brand-slate/50 mb-1">Mersin</p>
                             <p className="font-mono text-sm text-brand-slate">Transit: 30 Days</p>
                          </div>
                          <div>
                             <p className="text-[10px] uppercase tracking-widest text-brand-slate/50 mb-1">Dubai</p>
                             <p className="font-mono text-sm text-brand-slate">Transit: 38 Days</p>
                          </div>
                       </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
