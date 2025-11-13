"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBanners } from "../../lib/api";

const SMART_WATCH_CATEGORY = process.env.NEXT_PUBLIC_CATEGORY_SMART_WATCHES;
const EARBUDS_CATEGORY = process.env.NEXT_PUBLIC_CATEGORY_EARBUDS;

const getCategoryHref = (categoryId) =>
  categoryId ? `/products?category=${categoryId}` : "/products";

export default function PromoBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const response = await fetchBanners();
        
        if (response?.success && response?.data && response.data.length >= 4) {
          // Use 3rd and 4th banners (index 2 and 3)
          const banner3 = response.data[2]?.image_path;
          const banner4 = response.data[3]?.image_path;
          
          if (banner3 && banner4) {
            setBanners([
              {
                src: banner3,
                alt: response.data[2]?.title || "Promotional banner 1",
                categoryId: SMART_WATCH_CATEGORY,
              },
              {
                src: banner4,
                alt: response.data[3]?.title || "Promotional banner 2",
                categoryId: EARBUDS_CATEGORY,
              },
            ]);
          } else {
            console.warn("Banner data incomplete, using fallback");
            setBanners([
              {
                src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921134.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
                alt: "Haylou Iron Neo Smartwatch promotional banner",
                categoryId: SMART_WATCH_CATEGORY,
              },
              {
                src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921137.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
                alt: "Realme Buds Air7 promotional banner",
                categoryId: EARBUDS_CATEGORY,
              },
            ]);
          }
        } else {
          console.warn("No banner data received from API, using fallback");
          setBanners([
            {
              src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921134.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
              alt: "Haylou Iron Neo Smartwatch promotional banner",
              categoryId: SMART_WATCH_CATEGORY,
            },
            {
              src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921137.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
              alt: "Realme Buds Air7 promotional banner",
              categoryId: EARBUDS_CATEGORY,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        // Fallback to default banners
        setBanners([
          {
            src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921134.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            alt: "Haylou Iron Neo Smartwatch promotional banner",
            categoryId: SMART_WATCH_CATEGORY,
          },
          {
            src: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1750921137.jpg&w=1920&q=100&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
            alt: "Realme Buds Air7 promotional banner",
            categoryId: EARBUDS_CATEGORY,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 pt-6 pb-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative w-full min-h-[220px] lg:min-h-[320px] aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-[var(--radius-2xl)] flex items-center justify-center"
            >
              <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-8 lg:px-10 pt-6 pb-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="grid gap-4 lg:grid-cols-2">
        {banners.map((banner, index) => (
          <Link
            key={index}
            href={getCategoryHref(banner.categoryId)}
            className="group relative block overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-soft)]"
          >
            <div className="relative w-full min-h-[220px] lg:min-h-[320px] aspect-[16/9]">
              <Image
                unoptimized
                fill
                src={banner.src}
                alt={banner.alt}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={index === 0}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

