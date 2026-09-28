"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Ship } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to([progressRef.current, iconRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.2,
      }).to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-obsidian text-brand-slate"
    >
      <div ref={iconRef} className="mb-8 flex flex-col items-center">
        {/* Placeholder for SVG animation of ship silhouette */}
        <div className="relative h-16 w-16 text-brand-gold overflow-hidden">
          <Ship size={64} className="stroke-1 opacity-80 animate-pulse" />
        </div>
        <h1 className="mt-6 text-2xl font-heading tracking-[0.2em] font-semibold text-brand-slate">
          ARYA AZIZ
        </h1>
        <p className="text-xs tracking-widest text-brand-navy opacity-70 mt-1 uppercase">
          Shipping
        </p>
      </div>

      <div ref={progressRef} className="flex flex-col items-center w-full max-w-[200px]">
        <div className="font-mono text-xl mb-4 tabular-nums font-light tracking-wider">
          {progress.toString().padStart(3, "0")}%
        </div>
        <div className="h-[1px] w-full bg-brand-navy overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-brand-gold"
            style={{ width: `${progress}%`, transition: "width 0.2s ease-out" }}
          />
        </div>
      </div>
    </div>
  );
}
