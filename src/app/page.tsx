"use client";

import { useState } from "react";
import Preloader from "@/components/layout/Preloader";
import SmoothScroller from "@/components/layout/SmoothScroller";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Calculator from "@/components/sections/Calculator";
import Tracking from "@/components/sections/Tracking";
import Corridors from "@/components/sections/Corridors";
import Security from "@/components/sections/Security";
import TrustMarkers from "@/components/sections/TrustMarkers";
import Regulations from "@/components/sections/Regulations";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <SmoothScroller>
        <Header />
        <main className="relative w-full min-h-screen">
          <Hero />

          <div className="relative z-10 bg-brand-obsidian">
            <TrustMarkers />
            <Corridors />
            <Security />
            <Tracking />
            <Calculator />
            <Regulations />
          </div>
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
