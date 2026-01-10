'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  tags: string[];
  parallaxOffset: number;
  parallaxSpeed: { from: number; to: number };
}

export default function PortfolioCard({ 
  project, 
  index 
}: { 
  project: Project; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    // 1. IMAGE INNER-PARALLAX (Window Effect)
    // This makes the image move inside its container
    gsap.to(imageRef.current, {
      yPercent: project.parallaxSpeed.to,
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom', // When top of card hits bottom of viewport
        end: 'bottom top',   // When bottom of card hits top of viewport
        scrub: true,         // Smooth scrubbing
      }
    });

    // 2. CARD COLUMN PARALLAX (Different speeds for columns)
    // Only apply to even-indexed cards (second column)
    if (index % 2 === 1) {
      gsap.to(cardRef.current, {
        yPercent: -10, // Move up slightly slower
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // 3. REVEAL ANIMATION (Entrance)
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1 // Stagger delay
    });

  }, [index, project.parallaxSpeed]);

  return (
    <motion.article
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
        index % 2 === 1 ? 'mt-12 md:mt-24' : ''
      }`}
      // 4. HOVER EFFECTS with Framer Motion
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
        
        {/* Image with Parallax */}
        <motion.img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-[120%] object-cover" // 120% height for parallax room
          whileHover={{ scale: 1.05 }} // Hover scale
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and Button */}
        <div className="flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase">
            {project.title} <br />
            {project.subtitle}
            <span className="font-light ml-2">© {project.year}</span>
          </h2>

          {/* Arrow Button */}
          <motion.button
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-5 h-5"
            >
              <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}