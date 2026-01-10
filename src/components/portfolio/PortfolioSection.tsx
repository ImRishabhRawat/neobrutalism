'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PortfolioCard from './PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'UrbanNest x',
    subtitle: 'Room booking site',
    year: '2024',
    image: '/portfolio/project1/1.png',
    tags: ['Website Development', 'SEO Optimization', 'Digital Marketing'],
    parallaxOffset: 0, // First column, no offset
    parallaxSpeed: { from: 0, to: 0 }
  },
  {
    id: 2,
    title: 'SolarMed',
    subtitle: 'Doctor appointment site',
    year: '2024',
    image: '/portfolio/project2/1.png',
    tags: ['Website Development', 'Digital Marketing', 'Meta & Google Ads'],
    parallaxOffset: 30, // Second column, offset down
    parallaxSpeed: { from: 0, to: 30 } // Moves down 30% on scroll
  },
  // Add more projects...
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Header */}
      <div className="container mx-auto mb-16">
        <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">
          My Projects
        </span>
        <h2 className="text-4xl md:text-6xl font-bold">
          Showcasing My<br />
          Work & Creations
        </h2>
      </div>

      {/* Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}