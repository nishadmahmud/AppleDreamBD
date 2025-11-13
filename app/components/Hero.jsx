"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSliders, fetchBanners } from "../../lib/api";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bigImages, setBigImages] = useState([]);
  const [smallImages, setSmallImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sliders and banners from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch sliders for main slider
        const slidersResponse = await fetchSliders();
        if (slidersResponse?.success && slidersResponse?.data && slidersResponse.data.length > 0) {
          const firstSlider = slidersResponse.data[0];
          if (firstSlider?.image_path && Array.isArray(firstSlider.image_path) && firstSlider.image_path.length > 0) {
            setBigImages(firstSlider.image_path);
          } else {
            console.warn("Slider data found but no image_path array");
            setBigImages([
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            ]);
          }
        } else {
          console.warn("No slider data received from API");
          setBigImages([
            "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
          ]);
        }

        // Fetch banners for side banners (1st and 2nd)
        const bannersResponse = await fetchBanners();
        if (bannersResponse?.success && bannersResponse?.data && bannersResponse.data.length >= 2) {
          const banner1 = bannersResponse.data[0]?.image_path;
          const banner2 = bannersResponse.data[1]?.image_path;
          if (banner1 && banner2) {
            setSmallImages([banner1, banner2]);
          } else {
            console.warn("Banner data incomplete, using fallback");
            setSmallImages([
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
              "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            ]);
          }
        } else {
          console.warn("No banner data received from API, using fallback");
          setSmallImages([
            "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to default images on error
        setBigImages([
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        ]);
        setSmallImages([
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
          "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470901.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
        <div className="grid lg:grid-cols-3 gap-2 lg:gap-6">
          <div className="lg:col-span-2 relative rounded-sm overflow-hidden aspect-[6/3] lg:aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">Loading...</div>
              </div>
            ) : bigImages.length > 0 ? (
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
                        className="w-full h-full  object-fit"
                        width={1600}
                        height={900}
                        priority={currentSlide === 0}
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">No sliders available</div>
              </div>
            )}
          </div>

          {/* Small banners - side by side on mobile, stacked on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4">
            {smallImages.map((src, idx) => (
              <div
                key={idx}
                className="relative rounded-sm overflow-hidden aspect-[4/3] lg:aspect-[1280/682] shadow-[var(--shadow-strong)] bg-gray-100 dark:bg-gray-800"
              >
                <Image
                  unoptimized
                  src={src}
                  alt={`Hero side banner ${idx + 1}`}
                  className="w-full h-full object-cover lg:object-contain"
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
