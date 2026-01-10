"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
  /** The main large text to be revealed */
  text: string;
  /** Small label text next to the dot */
  dotLabel?: string;
  /** Optional custom class names */
  className?: string;
}

/**
 * TextReveal Component
 *
 * Logic:
 * 1. Splitting: Breaks text into individual words.
 * 2. Mapping: Uses Framer Motion's useScroll to track container progress.
 * 3. Distribution: Each word gets a specific scroll "window" to reveal its opacity.
 * 4. Aesthetics: Premium feel with low base opacity (0.1) that lights up to 1.
 */
export default function TextReveal({
  text,
  dotLabel,
  className = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container's viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.3", "end 0.2"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`w-full py-24 md:py-40 bg-transparent ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Label with Animated Dot */}
        {dotLabel && (
          <div className="flex items-center gap-5 mb-12 overflow-hidden">
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
                scale: useTransform(scrollYProgress, [0, 0.1], [0.5, 1]),
              }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
            <p className="text-white/80 text-xl md:text-2xl font-medium italic tracking-widest uppercase">
              {dotLabel.split("").map((char, i) => (
                <Char
                  key={i}
                  progress={scrollYProgress}
                  range={[0, 0.15]}
                  index={indexHelper(char, i, dotLabel)}
                  total={dotLabel.length}
                >
                  {char}
                </Char>
              ))}
            </p>
          </div>
        )}

        {/* Main Text Reveal */}
        <h2 className="flex flex-wrap text-white text-[10vw] md:text-[7.5vw] font-bebas tracking-tighter uppercase leading-[0.8]">
          {text.split("").map((char, i) => (
                <Char
                  key={i}
                  progress={scrollYProgress}
                  range={[0, 0.15]}
                  index={indexHelper(char, i, text)}
                  total={text.length}
                >
                  {char}
                </Char>
              ))}
        </h2>
      </div>
    </div>
  );
}

/**
 * Word Component
 * Handles the opacity animation for a single word
 */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Map scroll progress to opacity: from very dim (0.1) to fully bright (1)
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <span className="relative mr-[0.25em] mb-[0.1em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/**
 * Char Component
 * Handles individual character reveal for the dot label
 */
function Char({
  children,
  progress,
  range,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
  total: number;
}) {
  const charStart = range[0] + (index / total) * (range[1] - range[0]);
  const charEnd = charStart + (1 / total) * (range[1] - range[0]);
  const opacity = useTransform(progress, [charStart, charEnd], [0.1, 1]);

  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

// Simple helper to avoid map index issues if text has spaces
function indexHelper(char: string, i: number, full: string) {
  return i;
}
