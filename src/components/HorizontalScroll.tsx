"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * HorizontalScroll Logic (Fixed for smooth scrolling):
 * 1. Separate the pin wrapper from the scroll container
 * 2. Use center-center pinning for stability at start/end
 * 3. Implement refresh function for accurate dimension calculations
 * 4. Use scrub: true for direct scrollbar linking (no delay)
 * 5. Add will-change CSS for GPU optimization
 */
export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const slider = sliderRef.current;

    if (!wrapper || !slider) return;

    let scrollWidth: number;
    let horizontalScrollLength: number;

    // Refresh function to recalculate dimensions
    function refresh() {
      if (!slider) return;
      scrollWidth = slider.scrollWidth;
      horizontalScrollLength = scrollWidth - window.innerWidth;
    }

    // Initial calculation
    refresh();

    // Create the horizontal scroll animation
    const ctx = gsap.context(() => {
      gsap.to(slider, {
        x: () => -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: wrapper, // Pin the wrapper, not the slider
          scrub: true, // Direct link to scrollbar (no delay)
          start: "center center", // More stable than "top 10%"
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    // Listen for refresh events
    ScrollTrigger.addEventListener("refreshInit", refresh);

    return () => {
      ctx.revert();
      ScrollTrigger.removeEventListener("refreshInit", refresh);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden bg-neutral-900"
    >
      <div
        ref={sliderRef}
        className="flex h-screen w-max items-center px-[5vw]"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </section>
  );
}
