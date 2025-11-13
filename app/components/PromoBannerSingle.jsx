"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchBanners } from "../../lib/api";

const FALLBACK_BANNER_SRC =
  "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470947.jpg&w=1080&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS";

export default function PromoBannerSingle() {
  const [bannerSrc, setBannerSrc] = useState(FALLBACK_BANNER_SRC);
  const [bannerAlt, setBannerAlt] = useState("Mid-page promotional banner");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        setLoading(true);
        const response = await fetchBanners();
        
        if (response?.success && response?.data && response.data.length >= 5) {
          // Use 5th banner (index 4)
          const banner5 = response.data[4]?.image_path;
          const banner5Title = response.data[4]?.title;
          
          if (banner5) {
            setBannerSrc(banner5);
            setBannerAlt(banner5Title || "Mid-page promotional banner");
          } else {
            console.warn("5th banner data incomplete, using fallback");
            setBannerSrc(FALLBACK_BANNER_SRC);
          }
        } else {
          console.warn("No banner data received from API, using fallback");
          setBannerSrc(FALLBACK_BANNER_SRC);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
        setBannerSrc(FALLBACK_BANNER_SRC);
      } finally {
        setLoading(false);
      }
    };

    loadBanner();
  }, []);

  return (
    <section className="px-4 sm:px-8 lg:px-10 pt-6 pb-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="relative w-full overflow-hidden rounded-xl shadow-[var(--shadow-soft)]">
        {loading ? (
          <div className="relative w-full min-h-[380px] lg:min-h-[520px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="relative w-full min-h-[380px] lg:min-h-[520px]">
            <Image
              unoptimized
              fill
              src={bannerSrc}
              alt={bannerAlt}
              className="object-cover"
              sizes="(min-width: 1024px) 70vw, 100vw"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

