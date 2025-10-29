"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, TrendingUp } from "lucide-react";

export default function DealOfDay() {
  const sectionRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 32 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }

    // Animated countdown
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CounterBox = ({ value, label, prevValue }) => {
    const [displayValue, setDisplayValue] = useState(value);
    
    useEffect(() => {
      setDisplayValue(value);
    }, [value]);

    return (
      <motion.div
        className="relative text-center bg-white dark:bg-background-dark p-4 rounded-xl w-24 shadow-lg overflow-hidden"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative h-10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={displayValue}
              className="text-3xl font-black text-gray-900 dark:text-white absolute"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {String(displayValue).padStart(2, "0")}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider relative z-10 mt-2">
          {label}
        </p>
        
        {/* Pulse ring on hover */}
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-xl"
          initial={{ opacity: 0, scale: 1 }}
          whileHover={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.05, 1.1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
            style={{
              left: `${i * 25}%`,
              top: `${(i % 2) * 50}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative bg-gradient-to-br from-gray-50 to-white dark:from-background-dark/60 dark:to-background-dark/40 border border-gray-200 dark:border-gray-800 rounded-[var(--radius-2xl)] p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-[var(--shadow-strong)] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="w-full lg:w-1/2 flex justify-center relative z-10"
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative">
            <Image
              unoptimized
              className="max-w-xs md:max-w-sm rounded-2xl shadow-2xl"
              alt="Apple Watch Ultra 2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQeMqxDvk9cDu01zKqKg5LHKI20ktPYWaluale0LTt94JKzm9I5cy-H8DSzHOFX-9SH46v-6MihVk6CuzbpU0rBa6wg9w5Ke2Q6jackJXdHHGxDb008dbCwjcZEhoKUPsBEyi8Y6J60Pu7_Fr4NhA-t2Rtu6h2XsEgJlAy6QNSunw3oXb5Du3D-zCDWgzCHWVH2WRvGga38wbF5Sx1ims6XNgZylHAqcuuIL4--6SqAhO5fWITj3Qg0--2i0aFXGp_8eU_8pp-_2-t"
              width={1000}
              height={1000}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-2xl scale-110 rounded-2xl" />
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-4 w-4 fill-current" />
            <span className="font-bold uppercase tracking-wider text-sm">Deal of the Day</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-gray-900 via-primary to-gray-900 dark:from-white dark:via-primary dark:to-white bg-clip-text">
            Apple Watch Ultra 2
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
            Next-level adventure. The most rugged and capable Apple Watch pushes
            limits again. Featuring an all-new S9 SiP and a magical new way to
            use your watch without touching the screen.
          </p>

          <div className="flex items-center gap-2 justify-center lg:justify-start mb-8">
            <motion.div
              className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold text-sm">43% OFF</span>
            </motion.div>
            <span className="text-gray-400 line-through text-lg">$799</span>
            <span className="text-3xl font-black text-primary">$455</span>
          </div>

          <div className="flex justify-center lg:justify-start gap-3 mb-8 flex-wrap">
            <CounterBox value={timeLeft.hours} label="Hours" />
            <CounterBox value={timeLeft.minutes} label="Mins" />
            <CounterBox value={timeLeft.seconds} label="Secs" />
          </div>

          <motion.button
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[0.9rem] h-14 px-8 bg-primary text-white text-lg font-bold shadow-[var(--shadow-soft)]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(17, 115, 212, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Clock className="h-5 w-5" />
            <span>Grab Deal Now</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Limited Stock!</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
