"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

function CategoryTile({ title, description, img, delay = 0, categoryId }) {
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    if (isHovered) {
      gsap.to(imgRef.current, {
        scale: 1.15,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <Link href={`/products?category=${categoryId}`}>
      <motion.div
        data-tile
        className="relative group overflow-hidden rounded-[var(--radius-xl)] aspect-video md:aspect-auto md:min-h-[400px] shadow-[var(--shadow-soft)] cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
      >
        <Image
          ref={imgRef}
          unoptimized
          className="w-full h-full object-cover"
          alt={title}
          src={img}
          width={1000}
          height={1000}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
              {title}
            </h3>
            <motion.p
              className="text-gray-100 mb-4 text-base leading-relaxed"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {description}
            </motion.p>

            <motion.button
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Video play icon */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-center w-16 h-16 bg-white/30 backdrop-blur rounded-full border-2 border-white/50"
            whileHover={{ scale: 1.2 }}
            animate={{
              boxShadow: isHovered
                ? [
                    "0 0 0 0 rgba(255,255,255,0.7)",
                    "0 0 0 20px rgba(255,255,255,0)",
                  ]
                : "0 0 0 0 rgba(255,255,255,0)",
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            <Play className="h-6 w-6 text-white fill-white ml-1" />
          </motion.div>
        </motion.div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/50 to-transparent"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "top right" }}
        />
      </motion.div>
    </Link>
  );
}

export default function DiscoverMore() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-gray-900 dark:text-white text-4xl font-bold mb-3">
          Discover More
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore our wide range of tech categories.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryTile
          title="Smartwatches"
          description="Track your fitness and stay connected with the latest smartwatch technology."
          img="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
          delay={0}
          categoryId="6528"
        />
        <CategoryTile
          title="Headphones"
          description="Immerse yourself in crystal-clear sound with premium audio gear."
          img="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
          delay={0.2}
          categoryId="6526"
        />
      </div>
    </section>
  );
}
