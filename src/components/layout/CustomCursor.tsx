"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [prefersReducedMotion]);

  if (!isMounted || prefersReducedMotion || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-brand-gold rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 16 : 8),
        y: mousePosition.y - (isHovering ? 16 : 8),
        scale: isHovering ? 3 : 1,
        opacity: 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    />
  );
}
