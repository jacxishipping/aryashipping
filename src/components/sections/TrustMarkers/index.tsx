"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { id: "metric-1", value: 15000, suffix: "+", label: "Vehicles Delivered" },
  { id: "metric-2", value: 99.6, suffix: "%", label: "Safe Arrival Rate", isFloat: true },
  { id: "metric-3", value: 48, prefix: "38-", suffix: "", label: "Days Avg Transit" },
  { id: "metric-4", value: 10, prefix: "$", suffix: "M+", label: "Marine Coverage" },
];

export default function TrustMarkers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const labelsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        const targetValue = METRICS[i].value;
        const isFloat = METRICS[i].isFloat;

        gsap.to(counter, {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          snap: { innerHTML: isFloat ? 0.1 : 1 },
          onUpdate: function () {
            if (counter) {
              const val = Number(this.targets()[0].innerHTML);
              counter.innerHTML = isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString();
            }
          },
        });
      });

      // Label stagger
      gsap.fromTo(
        labelsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="py-20 bg-brand-navyDark relative border-b border-brand-navy">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-brand-navy">
          {METRICS.map((metric, index) => (
            <div key={metric.id} className="text-center md:px-4">
               <div className="font-mono text-4xl md:text-5xl lg:text-6xl text-brand-gold mb-2 font-light flex items-center justify-center">
                 {metric.prefix && <span>{metric.prefix}</span>}
                 <span ref={(el) => { countersRef.current[index] = el; }}>
                   {prefersReducedMotion ? metric.value : 0}
                 </span>
                 {metric.suffix && <span>{metric.suffix}</span>}
               </div>
               <p
                 ref={(el) => { labelsRef.current[index] = el; }}
                 className="text-brand-slate/70 text-sm uppercase tracking-widest font-medium"
               >
                 {metric.label}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
