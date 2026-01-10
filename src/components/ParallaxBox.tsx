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
  /** Show debug markers */
  markers?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * ParallaxBox Component
 *
 * A reusable component that creates a parallax effect with:
 * - Container that moves at one speed
 * - Image inside that moves at a different speed (creates "window reveal" effect)
 * - Responsive: Disables box parallax on mobile, reduces image parallax intensity
 *
 * @example
 * ```tsx
 * <ParallaxBox
 *   imageSrc="/portfolio/project1/1.jpg"
 *   imageAlt="Project 1"
 *   width={400}
 *   height={500}
 *   boxMovement={-225}
 *   imageMovement={200}
 *   imageStartY={-230}
 * />
 * ```
 */
export default function ParallaxBox({
  imageSrc,
  imageAlt,
  width,
  height,
  boxMovement,
  imageMovement,
  imageStartY = -200,
  markers = false,
  className = "",
}: ParallaxBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Apply parallax to the box container
  // On mobile: disable box movement (0) for stable boxes
  // On desktop: use full boxMovement value
  useParallax(boxRef, {
    yMovement: isMobile ? 0 : boxMovement,
    startY: 0,
    markers,
  });

  // Apply parallax to the inner image (opposite direction for window effect)
  // On mobile: reduce intensity to 50% for subtle effect
  // On desktop: use full imageMovement value
  useParallax(imageRef, {
    yMovement: isMobile ? imageMovement * 0.5 : imageMovement,
    startY: isMobile ? imageStartY * 0.5 : imageStartY,
    trigger: boxRef, // Use box as trigger
    markers: false, // Don't show markers for inner animation
  });

  return (
    <div
      ref={boxRef}
      className={`bg-blue-300 rounded-2xl overflow-hidden relative flex items-center justify-center ${className}`}
      style={{
        width: isMobile ? "100%" : `${width}px`,
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
  );
}
