"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

function ProductCard({ title, description, img, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)] perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        <Image
          unoptimized
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={title}
          src={img}
          width={1000}
          height={1000}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
        
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${useTransform(x, [-0.5, 0.5], ["30%", "70%"]).get()} ${useTransform(y, [-0.5, 0.5], ["30%", "70%"]).get()}, rgba(17, 115, 212, 0.3) 0%, transparent 60%)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-z-20" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="flex items-center gap-1 mb-2"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm ml-2">(4.9)</span>
          </motion.div>

          <h3 className="text-2xl font-bold drop-shadow-lg mb-1">{title}</h3>
          <p className="text-white/90 mb-4">{description}</p>
          
          <motion.button
            className="group/btn inline-flex items-center gap-2 font-semibold text-white bg-primary/90 hover:bg-primary px-5 py-2.5 rounded-lg transition-all"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
        >
          HOT
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedSmartphones() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="flex flex-col w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-gray-900 dark:text-white text-4xl font-bold leading-tight tracking-[-0.02em] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Smartphones
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The best of the best, from the brands you love.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard
            title="iPhone 15 Pro"
            description="The ultimate iPhone experience."
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxKnfL_88VwTYjnOdnDQf93pXS6vbbXTOb_9zsQjcjkzjANe9iWYQRsSnN7OVNlbScbBaUfudtTCOBWpL5Ekkmzjxn0Ra-OgOcQ0xaeDwUPg__yjLtSn71Lz5Lv8mY2SBzuIcT5ulrlHwcmaAhX96SSDU-OtANcI6-FQFtH86-8mJzvieh3lLkN7K07tSGgCd3NXolkhRON4y0pBSyafCpV53xXtQ0EBYiliJMfELe2Whu5u26F1ksrDX0RF88dErw-cx7L_FTCEr"
            delay={0}
          />
          <ProductCard
            title="Samsung Galaxy S24 Ultra"
            description="Galaxy AI is here."
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuD5EJOx7VnWcnyOHjROUZJ52faau-PoqbUHl59Pa7atb4bf1_KxRiVygVRl2MHoykvoiB0e5ngz7hSJfyRIM76oH6CBqs6ALGBUcgNLIq64CiI5_8CKvx2RwckoVXezR1Kk2Fd1bOKs4Lfu6h_JXqE3Q_Kk5xH1hwDt_j69bSxPTjucJPYfBhEkDcqYdSdElgtLyiiaeapUfL7neYw9kOZOoOK26KCfw3l7CPhaowUOZkctG5DSKpkNdkqwXXsskMBof_R8qSzZebz2"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
