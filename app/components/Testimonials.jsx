"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
export default function Testimonials() {
  const testimonials = [
    {
      quote:
        '"Absolutely thrilled with my new iPhone. The delivery was incredibly fast and the customer service was top-notch. Will definitely shop here again!"',
      author: "Sarah L.",
    },
    {
      quote:
        '"Apple Dream BD is my go-to for all things tech. Their prices are competitive and the product selection is fantastic. My Galaxy S24 arrived in perfect condition."',
      author: "Michael B.",
    },
    {
      quote:
        '"The website is so easy to navigate. Found the accessories I needed for my MacBook in seconds. A seamless shopping experience from start to finish."',
      author: "Jessica P.",
    },
    {
      quote:
        '"Great selection of products and the checkout process was smooth. My only wish is for more color options on some items. Overall, a great experience."',
      author: "Emily R.",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const sectionRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, []);
  return (
    <section ref={sectionRef} className="bg-gray-50 dark:bg-background-dark py-16 overflow-hidden transition-colors duration-300">
      <div className="px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
            Real feedback from our happy customers.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-8 animate-scroll-testimonials"
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map((t, index) => (
              <div
                key={`${t.author}-${index}`}
                className="bg-gray-50 dark:bg-background-dark/60 border border-gray-200 dark:border-gray-800 rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] w-full max-w-sm shrink-0 transition-colors duration-300"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 transition-colors duration-300">
                  {t.quote}
                </blockquote>
                <cite className="font-bold text-gray-900 dark:text-white not-italic transition-colors duration-300">
                  - {t.author}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
