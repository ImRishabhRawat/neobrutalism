"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * HorizontalScroll Logic:
 * 1. The 'trigger' section is the parent. We pin this so it stays fixed while we scroll.
 * 2. The 'slider' is the flex container that contains all the cards.
 * 3. We move the 'slider' to the left by its total scrollable width.
 * 4. GSAP maps the vertical scroll distance to the horizontal X translation.
 */
export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = sectionRef.current;
    const trigger = triggerRef.current;

    if (!pin || !trigger) return;

    // Calculate how much to move: (Total Width of Slider - Window Width)
    // Using Percent is easier: move it -(num_items - 1) * 100%
    const totalWidth = pin.scrollWidth;
    const windowWidth = window.innerWidth;
    const amountToScroll = totalWidth - windowWidth;

    const ctx = gsap.context(() => {
      gsap.to(pin, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top 10%",
          // The end determines the duration of the scroll
          // We set it to the amount we scroll to keep speed 1:1
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative overflow-hidden bg-neutral-900"
    >
      <div
        ref={sectionRef}
        className="flex h-screen w-max items-center px-[5vw]"
      >
        {children}
      </div>
    </section>
  );
}
