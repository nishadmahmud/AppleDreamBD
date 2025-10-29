"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      // Staggered entrance
      gsap.from([badgeRef.current, h1Ref.current, pRef.current, ctaRef.current], {
        opacity: 0,
        y: 32,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Parallax image
      if (imgRef.current && containerRef.current) {
        gsap.to(imgRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }
  }, []);

  return (
    <section className="px-4 sm:px-8 lg:px-10 py-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div ref={containerRef} className="relative w-full @container rounded-[var(--radius-2xl)] overflow-hidden text-white min-h-[580px] flex items-center shadow-[var(--shadow-strong)] group">
        <div className="absolute inset-0">
          <Image
            ref={imgRef}
            unoptimized
            src="https://media.macphun.com/img/uploads/customer/blog/3501/1749749510684b0f06056cb7.96384689.jpg?q=85&w=1680"
            alt="Premium tech gadgets displayed on a sleek background"
            className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            width={1000}
            height={1000}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 @[768px]:p-12 @[1024px]:p-16 w-full">
          <div className="flex flex-col gap-6 max-w-2xl">
            <motion.div
              ref={badgeRef}
              className="inline-flex items-center gap-2 self-start bg-primary/20 backdrop-blur border border-primary/30 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(17, 115, 212, 0.3)" }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-white uppercase tracking-[0.15em]">
                Next Gen Technology
              </span>
            </motion.div>

            <div className="flex flex-col gap-3">
              <h1 ref={h1Ref} className="text-5xl @[480px]:text-7xl font-black leading-[1.1] tracking-[-0.04em] text-white drop-shadow-lg">
                Unleash Your
                <span className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
                  Potential.
                </span>
              </h1>
              <h2 ref={pRef} className="text-lg @[480px]:text-xl text-gray-100/90 leading-relaxed">
                Discover the latest in premium tech. Cutting-edge performance
                and iconic design, all in one place.
              </h2>
            </div>

            <motion.div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
              <motion.button
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[0.9rem] h-12 px-6 bg-primary text-white text-base font-semibold leading-normal tracking-[0.015em] shadow-[var(--shadow-soft)]"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(17, 115, 212, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="inline-flex items-center gap-2 h-12 px-6 border-2 border-white/30 backdrop-blur text-white text-base font-semibold rounded-[0.9rem] hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                View Deals
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Carousel indicators with animation */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <motion.button
              key={i}
              className={`h-2 rounded-full ${i === 0 ? "w-8 bg-white" : "w-2 bg-white/50"}`}
              whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,1)" }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
