"use client"

import gsap from "gsap";
import { useEffect, useRef } from "react";

export const TextAnim = () => {
    const box1Ref = useRef<HTMLDivElement>(null);
    const box2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(box1Ref.current, {
            x: 0
        }, {
            x: 400,
             ease: "none",
        scrollTrigger: {
          trigger: box1Ref.current,
          start: "top 90%",
          end: "bottom 60%",
          scrub: true,
          markers: true,
        },
        })
        gsap.fromTo(box2Ref.current, {
            x: 0
        }, {
            x: 400,
             ease: "none",
        scrollTrigger: {
          trigger: box2Ref.current,
          start: "top 60%",
          end: "bottom 30%",
          scrub: true,
          markers: false,
        },
        })
    }, [])
    return (
        <div className="w-full h-screen flex items-center justify-left">
            <h1 className="text-white text-4xl font-bebas relative overflow-hidden">
                <span>Scroll down to </span>
                <span ref={box1Ref} className="bg-neutral-900 opacity-95 w-full h-1/2 absolute top-0 left-0"></span>
                 <br />
                <span>reveal the animation</span>
                <span ref={box2Ref} className="bg-neutral-900 opacity-95 w-full h-1/2 absolute bottom-0 left-0"></span>
                
            </h1>
        </div>
    )
}