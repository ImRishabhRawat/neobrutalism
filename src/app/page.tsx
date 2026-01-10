import ParallaxBox from "@/components/ParallaxBox";

/**
 * Home Page
 *
 * Clean, simple page that uses reusable ParallaxBox components.
 * Lenis smooth scroll is initialized globally in layout.tsx.
 */
export default function Home() {
  return (
    <div className="bg-neutral-900 w-full min-h-screen px-4 py-6">
      {/* Hero Section */}
      <div className="w-full h-screen">hello</div>

      {/* Parallax Section - Responsive Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-center">
        {/* Single column on mobile, 2 columns on desktop (768px+) */}
        <ParallaxBox
          imageSrc="/portfolio/project1/1.jpg"
          imageAlt="Project 1"
          width={400}
          height={500}
          boxMovement={-222}
          imageMovement={200}
          imageStartY={-230}
          markers={false}
        />

        <ParallaxBox
          imageSrc="/portfolio/project2/1.png"
          imageAlt="Project 2"
          width={550}
          height={350}
          boxMovement={-40}
          imageMovement={100}
          imageStartY={-100}
          markers={false}
        />
      </div>

      {/* Spacer Section */}
      <div className="w-full h-screen flex items-center justify-center">
        <ParallaxBox
          imageSrc="/portfolio/project3/1.png"
          imageAlt="Project 3"
          width={550}
          height={350}
          boxMovement={-40}
          imageMovement={100}
          imageStartY={-100}
          markers={false}
        />
      </div>
    </div>
  );
}
