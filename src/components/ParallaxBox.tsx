"use client";
import { useRef } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * ParallaxBox Component Props
 */
interface ParallaxBoxProps {
  /** Path to the image */
  imageSrc: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Width of the box in pixels */
  width: number;
  /** Height of the box in pixels */
  height: number;
  /** How far the box moves (negative = up) */
  boxMovement: number;
  /** How far the inner image moves (positive = down for window effect) */
  imageMovement: number;
  /** Starting Y position for the image */
  imageStartY?: number;
  /** Title of the project */
  title?: string;
  /** Subtitle or year of the project */
  subtitle?: string;
  /** Array of tags/badges */
  tags?: string[];
  /** Show debug markers */
  markers?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * ParallaxBox Component
 *
 * A reusable component that creates a parallax effect with:
 * - Container (Image + Text) that moves at one speed
 * - Image inside that moves at a different speed (creates "window reveal" effect)
 */
export default function ParallaxBox({
  imageSrc,
  imageAlt,
  width,
  height,
  boxMovement,
  imageMovement,
  imageStartY = -200,
  title,
  subtitle,
  tags = [],
  markers = false,
  className = "",
}: ParallaxBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");

  // Apply parallax to the entire container (Box + Text)
  useParallax(containerRef, {
    yMovement: isMobile ? 0 : boxMovement,
    startY: 0,
    markers,
  });

  // Apply parallax to the inner image
  useParallax(imageRef, {
    yMovement: isMobile ? imageMovement * 0.5 : imageMovement,
    startY: isMobile ? imageStartY * 0.5 : imageStartY,
    trigger: containerRef, // Triggered by the container
    markers: false,
  });

  return (
    <div
      ref={containerRef}
      className={`flex flex-col group ${className}`}
      style={{
        width: isMobile || isTablet ? "100%" : `${width}px`,
      }}
    >
      {/* Image Box */}
      <div
        className="bg-blue-300 rounded-3xl overflow-hidden relative flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]"
        style={{
          width: "100%",
          height: isMobile ? "300px" : `${height}px`,
        }}
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover scale-130"
          />
        </div>
      </div>

      {/* Text Content Below */}
      {(title || tags.length > 0) && (
        <div className="mt-6 flex flex-col gap-3">
          {/* Tags/Badges */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-[#1A1A1A] text-white/60 text-[10px] uppercase tracking-widest rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="flex flex-col">
            {title && subtitle && (
              <h3 className="text-white text-3xl font-bebas tracking-tighter uppercase leading-[1]">
                {title} <br />
                 {subtitle}
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
