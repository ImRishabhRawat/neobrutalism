"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image?: string;
  video?: string;
  videoPoster?: string;
  tags: string[];
  link: string;
  parallaxY?: string;
  overlay?: string;
  animationType?: "up" | "down" | "none";
}

const projects: Project[] = [
  {
    id: 1,
    title: "UrbanNest x",
    subtitle: "Room booking site",
    year: "© 2024",
    image: "/assets/img/portfolio/project1/1.png",
    tags: ["Website Development", "SEO Optimization", "Digital Marketing"],
    link: "#",
    overlay: "7",
    animationType: "up",
  },
  {
    id: 2,
    title: "SolarMed",
    subtitle: "Doctor appointment site",
    year: "© 2024",
    image: "/assets/img/portfolio/project2/1.png",
    tags: ["Website Development", "Digital Marketing", "Meta & Google Ads"],
    link: "#",
    overlay: "5",
    parallaxY: "30%",
  },
  {
    id: 3,
    title: "THIRTYSIXSTUDIO",
    subtitle: "Animation",
    year: "© 2025",
    image: "/assets/img/portfolio/project3/1.png",
    tags: ["Website Development", "UI/UX Design", "Digital Marketing"],
    link: "#",
    overlay: "3",
    animationType: "up",
  },
  {
    id: 4,
    title: "Jaysaan",
    subtitle: "Pharmacuticals",
    year: "© 2025",
    video: "/assets/img/portfolio/project4/jaysaan.mp4",
    videoPoster: "/assets/img/portfolio/project4/1.jpg",
    tags: ["Website Development", "SEO Optimization", "Digital Marketing"],
    link: "#",
    overlay: "6",
    parallaxY: "-70%",
  },
  {
    id: 5,
    title: "Ashirwad Healthcare",
    subtitle: "and Fertility Centre",
    year: "© 2025",
    image: "/assets/img/portfolio/project5/ashirwad.png",
    tags: ["Website Development", "UI/UX Design", "Digital Marketing"],
    link: "#",
    overlay: "6",
    animationType: "up",
  },
  {
    id: 6,
    title: "MS Carpenter",
    subtitle: "",
    year: "© 2023",
    image: "/assets/img/portfolio/project6/ms-carpenter.png",
    tags: [
      "Website Development",
      "Social Media Management",
      "Digital Marketing",
    ],
    link: "#",
    overlay: "5",
    animationType: "up",
  },
];

const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate cards with 'up' animation
      const upCards = cardsRef.current.filter(
        (card, index) => projects[index]?.animationType === "up" && card
      );

      upCards.forEach((card) => {
        if (!card) return;

        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Parallax animations for specific cards
      projects.forEach((project, index) => {
        const card = cardsRef.current[index];
        if (!card || !project.parallaxY) return;

        gsap.to(card, {
          y: project.parallaxY,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Image hover parallax effect
      const imageContainers =
        sectionRef.current?.querySelectorAll(".image-container");
      imageContainers?.forEach((container) => {
        const image = container.querySelector(".parallax-image");
        if (!image) return;

        container.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        container.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getOverlayOpacity = (overlay: string = "5") => {
    const overlayMap: { [key: string]: string } = {
      "3": "bg-black/30",
      "5": "bg-black/50",
      "6": "bg-black/60",
      "7": "bg-black/70",
    };
    return overlayMap[overlay] || "bg-black/50";
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-20">
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
            My Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Showcasing My
            <br />
            Work & Creations
          </h2>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative group ${
                project.id === 4 ? "md:self-end" : ""
              }`}
            >
              {/* Image/Video Container */}
              <div className="image-container relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                {/* Overlay */}
                <div
                  className={`absolute inset-0 z-10 ${getOverlayOpacity(
                    project.overlay
                  )} transition-opacity duration-300 group-hover:opacity-80`}
                />

                {/* Image or Video */}
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.videoPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="parallax-image w-full h-full object-cover transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="parallax-image w-full h-full object-cover transition-transform duration-700"
                  />
                )}
              </div>

              {/* Content */}
              <div className="relative z-20 flex flex-col">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 text-xs md:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title and Button */}
                <div className="flex justify-between items-end gap-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white uppercase leading-tight">
                    <a
                      href={project.link}
                      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                    >
                      {project.title} <br />
                      {project.subtitle && (
                        <>
                          {project.subtitle}
                          <br />
                        </>
                      )}
                      <span className="font-light text-xl md:text-2xl">
                        {project.year}
                      </span>
                    </a>
                  </h2>

                  {/* Arrow Button */}
                  <a
                    href={project.link}
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="w-5 h-5 md:w-6 md:h-6 fill-white dark:fill-gray-900"
                    >
                      <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
