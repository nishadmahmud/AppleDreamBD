"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Big slider images (left)
  const bigImages = [
    "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
    "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470827.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
    "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
  ];

  // Small banners (right)
  const smallImages = [
    "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
    "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bigImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bigImages.length]);

  return (
    <section className="px-4 sm:px-8 lg:px-10 pt-8 lg:pt-8 pb-6 bg-background-light dark:bg-background-dark transition-colors duration-300 -mt-4">
      <div className="w-full">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Left: Big slider */}
          <div className="lg:col-span-2 relative rounded-sm overflow-hidden aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800">
            <div className="absolute inset-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    unoptimized
                    src={bigImages[currentSlide]}
                    alt="Hero main banner"
                    className="w-full h-full object-contain"
                    width={1600}
                    height={900}
                    priority={currentSlide === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {bigImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/60"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Two small stacked banners */}
          <div className="grid gap-4">
            {smallImages.map((src, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800"
              >
                <Image
                  unoptimized
                  src={src}
                  alt={`Hero side banner ${idx + 1}`}
                  className="w-full h-full object-contain"
                  width={800}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
