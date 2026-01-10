"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // 1. Use the safe hook
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

// 2. Register the plugin!
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Use container as trigger
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // 3. Animation Logic
    gsap.fromTo(
      textRef.current,
      {
        y: 0, // Start at normal position
      },
      {
        y: 10, // Move DOWN as we scroll (Parallax effect)
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current, // Watch the PARENT wrapper
          start: "top top",   // Start when top of wrapper hits top of viewport
          end: "bottom top",  // End when bottom of wrapper hits top of viewport
          scrub: true,        // Smooth scrubbing
        },
      }
    );
     gsap.fromTo(
      imageRef.current,
      {
        y: 100, // Start at normal position
      },
      {
        y: -200, // Move DOWN as we scroll (Parallax effect)
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current, // Watch the PARENT wrapper
          start: "top top",   // Start when top of wrapper hits top of viewport
          end: "bottom top",  // End when bottom of wrapper hits top of viewport
          scrub: true,        // Smooth scrubbing
        },
      }
    );
  }, { scope: containerRef }); // Scope ensures selectors work inside this ref

  return (
    // Added ref={containerRef} here
    <div ref={containerRef} className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      
      <Image
        src="/portfolio/project7/1.jpg"
        alt="Background"
        fill
        className="object-cover z-0 scale-125"
        ref={imageRef}
      />

      {/* Added ref={textRef} here */}
      <h1 ref={textRef} className="text-black text-8xl font-bebas relative z-10">
        Scroll Down
      </h1>
    </div>
  );
};