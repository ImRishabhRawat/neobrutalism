import ParallaxBox from "@/components/ParallaxBox";
import { TextAnim } from "@/components/TextAnim";
import HorizontalScroll from "@/components/HorizontalScroll";
import { Hero } from "@/components/Hero";
import HomeView from "@/components/HomeView";

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
      {/* <Hero/> */}
<HomeView/>
      <TextAnim />

      {/* <TextReveal
        dotLabel="My Projects"
        text="Showcasing My Work & Creations"
        className="mt-10"
      /> */}

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
          title="Urbannest X"
          subtitle="Room Booking Site @ 2024"
          tags={["SEO Development", "Front-End", "Business"]}
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
          title="Breezybae X"
          subtitle="Hotel Booking Site @ 2024"
          tags={["SEO Development", "Front-End", "Business"]}
          markers={false}
        />
      </div>

      {/* Spacer Section */}
      <div className="w-full  flex items-center justify-center mb-50">
        <ParallaxBox
          imageSrc="/portfolio/project3/1.png"
          imageAlt="Project 3"
          width={550}
          height={350}
          boxMovement={-40}
          imageMovement={100}
          imageStartY={-100}
          title="Luxury Stay"
          subtitle="Resort Website @ 2023"
          tags={["React", "GSAP", "Next.js"]}
          markers={false}
        />
      </div>

      {/* Parallax Section - Responsive Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-center">
        {/* Single column on mobile, 2 columns on desktop (768px+) */}

        <ParallaxBox
          imageSrc="/portfolio/project2/1.png"
          imageAlt="Project 2"
          width={550}
          height={350}
          boxMovement={-40}
          imageMovement={100}
          imageStartY={-100}
          title="Breezybae X"
          subtitle="Hotel Booking Site @ 2024"
          tags={["SEO Development", "Front-End", "Business"]}
          markers={false}
        />

        <ParallaxBox
          imageSrc="/portfolio/project1/1.jpg"
          imageAlt="Project 1"
          width={400}
          height={500}
          boxMovement={-222}
          imageMovement={200}
          imageStartY={-230}
          title="Urbannest X"
          subtitle="Room Booking Site @ 2024"
          tags={["SEO Development", "Front-End", "Business"]}
          markers={false}
        />
      </div>

      {/* Spacer Section */}
      <div className="w-full  flex items-center justify-center mb-50">
        <ParallaxBox
          imageSrc="/portfolio/project3/1.png"
          imageAlt="Project 3"
          width={550}
          height={350}
          boxMovement={-40}
          imageMovement={100}
          imageStartY={-100}
          title="Luxury Stay"
          subtitle="Resort Website @ 2023"
          tags={["React", "GSAP", "Next.js"]}
          markers={false}
        />
      </div>

      {/* horizontal scroll section */}
      <div className="w-full h-[500px] flex items-center justify-center">  
hello
      </div>
      <HorizontalScroll>
        <div className="flex gap-10">
          <div className="w-[400px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 1</h2>
          </div>
          <div className="w-[600px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 2</h2>
          </div>
          <div className="w-[400px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 3</h2>
          </div>
          <div className="w-[800px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 4</h2>
          </div><div className="w-[400px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 1</h2>
          </div>
          <div className="w-[600px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 2</h2>
          </div>
          <div className="w-[400px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 3</h2>
          </div>
          <div className="w-[800px] h-[500px] bg-neutral-800 rounded-3xl shrink-0 flex items-center justify-center border border-white/10">
            <h2 className="text-white text-4xl font-bebas">Slide 4</h2>
          </div>
        </div>
      </HorizontalScroll>

      
    </div>
  );
}
