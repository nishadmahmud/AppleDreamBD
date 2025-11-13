"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSliders, fetchBanners } from "../../lib/api";

const CACHE_KEYS = {
  SLIDERS: 'hero_sliders_cache',
  BANNERS: 'hero_banners_cache',
};

// Helper to load from cache (client-side only)
const loadFromCache = (key) => {
  if (typeof window === 'undefined') return [];
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn(`Failed to load cached ${key}:`, e);
  }
  return [];
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Start with empty arrays to match server-side render (prevents hydration mismatch)
  const [bigImages, setBigImages] = useState([]);
  const [smallImages, setSmallImages] = useState([]);

  // Load cached images after mount (client-side only) to avoid hydration mismatch
  useEffect(() => {
    // Load from localStorage after mount (external system)
    const cachedSliders = loadFromCache(CACHE_KEYS.SLIDERS);
    const cachedBanners = loadFromCache(CACHE_KEYS.BANNERS);
    
    // Batch state updates
    if (cachedSliders.length > 0 || cachedBanners.length > 0) {
      // Use requestAnimationFrame to defer state updates and avoid hydration issues
      requestAnimationFrame(() => {
        if (cachedSliders.length > 0) {
          setBigImages(cachedSliders);
        }
        if (cachedBanners.length > 0) {
          setSmallImages(cachedBanners);
        }
      });
    }
  }, []);

  // Fetch sliders - update cache and show fresh data
  useEffect(() => {
    fetchSliders()
      .then((slidersResponse) => {
        if (slidersResponse?.success && slidersResponse?.data && slidersResponse.data.length > 0) {
          const firstSlider = slidersResponse.data[0];
          if (firstSlider?.image_path && Array.isArray(firstSlider.image_path) && firstSlider.image_path.length > 0) {
            // Save to cache
            try {
              localStorage.setItem(CACHE_KEYS.SLIDERS, JSON.stringify(firstSlider.image_path));
            } catch (e) {
              console.warn("Failed to cache sliders:", e);
            }
            setBigImages(firstSlider.image_path);
            return;
          }
        }
        // Fallback
        const fallback = [
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        ];
        setBigImages(fallback);
      })
      .catch((error) => {
        console.error("Error fetching sliders:", error);
        // Only set fallback if no cached images exist
        setBigImages((prev) => {
          if (prev.length === 0) {
            return [
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            ];
          }
          return prev;
        });
      });
  }, []);

  // Fetch banners - update cache and show fresh data
  useEffect(() => {
    fetchBanners()
      .then((bannersResponse) => {
        if (bannersResponse?.success && bannersResponse?.data && bannersResponse.data.length >= 2) {
          const banner1 = bannersResponse.data[0]?.image_path;
          const banner2 = bannersResponse.data[1]?.image_path;
          if (banner1 && banner2) {
            // Save to cache
            try {
              localStorage.setItem(CACHE_KEYS.BANNERS, JSON.stringify([banner1, banner2]));
            } catch (e) {
              console.warn("Failed to cache banners:", e);
            }
            setSmallImages([banner1, banner2]);
            return;
          }
        }
        // Fallback
        const fallback = [
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        ];
        setSmallImages(fallback);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
        // Only set fallback if no cached images exist
        setSmallImages((prev) => {
          if (prev.length === 0) {
            return [
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            ];
          }
          return prev;
        });
      });
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (bigImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bigImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bigImages.length]);

  return (
    <section className="px-4 sm:px-8 lg:px-10 pt-8 lg:pt-8 pb-6 bg-background-light dark:bg-background-dark transition-colors duration-300 -mt-4">
      <div className="w-full">
        {/* Main slider - full width on mobile, 2/3 on desktop */}
        <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
          <div className="lg:col-span-2 relative rounded-sm overflow-hidden aspect-[6/3] lg:aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800">
            {bigImages.length > 0 ? (
              <>
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
                        className="w-full h-full object-cover"
                        fill
                        priority={currentSlide === 0}
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Indicators */}
                {bigImages.length > 1 && (
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
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
                <div className="text-gray-400 dark:text-gray-600 text-sm">Loading slider...</div>
              </div>
            )}
          </div>

          {/* Small banners - side by side on mobile, stacked on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {smallImages.length > 0 ? (
              smallImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative rounded-sm overflow-hidden aspect-[4/3] lg:aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    unoptimized
                    src={src}
                    alt={`Hero side banner ${idx + 1}`}
                    className="w-full h-full object-cover"
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))
            ) : (
              <>
                {[0, 1].map((idx) => (
                  <div
                    key={idx}
                    className="relative rounded-sm overflow-hidden aspect-[4/3] lg:aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800 animate-pulse"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400 dark:text-gray-600 text-xs">Loading...</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
