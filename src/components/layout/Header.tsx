"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Corridors", href: "#corridors" },
  { label: "Fleet & Protection", href: "#security" },
  { label: "Tracking", href: "#tracking" },
  { label: "Calculator", href: "#calculator" },
  { label: "Regulations", href: "#regulations" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-brand-obsidian/90 backdrop-blur-md border-b border-brand-navy py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 relative z-50">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-[0.15em] text-brand-slate group-hover:text-brand-gold transition-colors duration-300 uppercase">
              Arya Aziz
            </span>
            <span className="text-[10px] tracking-widest text-brand-gold uppercase">
              Shipping
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium tracking-wide text-brand-slate/80 hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, "#calculator")}
            className="px-5 py-2.5 bg-brand-gold text-brand-obsidian text-sm font-bold tracking-wide rounded-sm hover:bg-brand-slate transition-all duration-300"
          >
            Get Quote
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-brand-slate hover:text-brand-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-obsidian/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-heading font-semibold text-brand-slate hover:text-brand-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
