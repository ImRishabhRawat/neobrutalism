'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from 'lenis';
import { useTransform, useScroll, motion, MotionValue } from 'framer-motion';

// Sample images array
const images = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg",
  "5.jpg", "6.jpg", "7.jpg", "8.jpg",
  "9.jpg", "10.jpg", "11.jpg", "12.jpg",
];

export default function HomeView() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // 1. Track the scroll progress of the gallery container
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'] // Start tracking when container enters viewport
  });

  // 2. Calculate window size safely (Next.js SSR protection)
  useEffect(() => {
    const lenis = new Lenis();

    // Smooth scroll RAF loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy(); // Cleanup Lenis
    };
  }, []);

  const { height } = dimension;

  // 3. Create the Parallax Transforms
  // We map scroll progress (0 to 1) to pixel movement (0 to height * X)
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  return (
    <main className="hidden md:block w-full bg-neutral-900">
      {/* Spacer just to let you scroll a bit before reaching the gallery */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Scroll Down</h1>
      </div>

      {/* THE GALLERY WRAPPER 
          - h-[175vh]: Makes the container very tall
          - overflow-hidden: Hides the images that are pushed "up" initially
      */}
      <div 
        ref={gallery} 
        className="h-[175vh] bg-[rgb(45,45,45)] relative flex gap-[2vw] p-[2vw] overflow-hidden box-border"
      >
        {/* Pass custom 'top' classes via props to replace SCSS nth-of-type */}
        <Column images={[images[0], images[1], images[2]]} y={y} top="-top-[45%]" />
        <Column images={[images[3], images[4], images[5]]} y={y2} top="-top-[95%]" />
        <Column images={[images[6], images[7], images[8]]} y={y3} top="-top-[45%]" />
        <Column images={[images[9], images[10], images[11]]} y={y4} top="-top-[75%]" />
      </div>

      <div className="h-[70vh] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-black">Footer</h1>
      </div>
    </main>
  );
}

// --- SUB COMPONENT ---

// Define Types for Props
interface ColumnProps {
  images: string[];
  y: MotionValue<number>; // Framer Motion type for the animated value
  top: string; // Tailwind class for initial offset
}

const Column = ({ images, y, top }: ColumnProps) => {
  return (
    <motion.div 
      className={`relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] ${top}`}
      style={{ y }} // Framer Motion handles the transform here
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full rounded-[1vw] overflow-hidden">
          <Image 
            src={`/images/${src}`} // Ensure these exist in public/images folder
            alt='image'
            fill
            className="object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};