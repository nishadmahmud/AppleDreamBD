"use client";
import Image from "next/image";

const bannerSrc =
  "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470947.jpg&w=1080&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS";

export default function PromoBannerSingle() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 pt-6 pb-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="relative w-full overflow-hidden rounded-xl shadow-[var(--shadow-soft)]">
        <div className="relative w-full min-h-[380px] lg:min-h-[520px]">
          <Image
            unoptimized
            fill
            src={bannerSrc}
            alt="Mid-page promotional banner"
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

