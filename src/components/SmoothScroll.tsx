"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll Component
 *
 * Initializes Lenis smooth scrolling globally for the entire application.
 * This component should be placed in the root layout to enable smooth scroll on all pages.
 *
 * Features:
 * - Momentum-based smooth scrolling
 * - Synced with GSAP ScrollTrigger for animations
 * - Optimized for performance with RAF loop
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration (higher = smoother/slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical", // Scroll direction
      smoothWheel: true, // Smooth mousewheel scrolling
    });

    // Animation frame loop to update Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Disable GSAP's lag smoothing for better sync with Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
