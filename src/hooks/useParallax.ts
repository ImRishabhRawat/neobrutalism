import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax Animation Options
 */
interface ParallaxOptions {
  /** How far the element moves (negative = up, positive = down) */
  yMovement: number;
  /** Starting Y position (default: 0) */
  startY?: number;
  /** Show debug markers (default: false) */
  markers?: boolean;
  /** Custom trigger element (default: uses the same element) */
  trigger?: RefObject<HTMLElement | null>;
  /** Start position (default: "top bottom") */
  start?: string;
  /** End position (default: "bottom top") */
  end?: string;
}

/**
 * useParallax Hook
 *
 * Creates a parallax scroll effect on a ref element using GSAP ScrollTrigger.
 *
 * @param ref - React ref to the element to animate
 * @param options - Parallax animation options
 *
 * @example
 * ```tsx
 * const boxRef = useRef(null);
 * useParallax(boxRef, { yMovement: -200, markers: true });
 *
 * return <div ref={boxRef}>Content</div>
 * ```
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions
) {
  const {
    yMovement,
    startY = 0,
    markers = false,
    trigger,
    start = "top bottom",
    end = "bottom top",
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const triggerElement = trigger?.current || element;

    // Create parallax animation
    const animation = gsap.fromTo(
      element,
      { y: startY },
      {
        y: yMovement,
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          start,
          end,
          scrub: true,
          markers,
        },
      }
    );

    // Cleanup
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [ref, yMovement, startY, markers, trigger, start, end]);
}
