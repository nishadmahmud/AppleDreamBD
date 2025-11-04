"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Clock, Zap, TrendingUp, ShoppingCart, Heart, Star, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function DealOfDay() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 32 });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  useEffect(() => {
    const fetchSmartwatch = async () => {
      try {
        // Fetch from Smart Watches category (ID: 6528)
        const response = await fetch('https://www.outletexpense.xyz/api/public/categorywise-products/6528?page=1&limit=1');
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setProduct(data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch smartwatch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSmartwatch();
  }, []);

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    rotateY.set(percentX * 10);
    rotateX.set(-percentY * 10);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product);
    }
  };

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

  if (loading) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  const inCart = isInCart(product.id);
  const isFav = isFavorite(product.id);
  const discountPercent = product.market_price ? Math.round(((product.market_price - product.retails_price) / product.market_price) * 100) : 43;

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
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-gray-900 dark:text-white text-4xl font-bold mb-3">
          Deal of the Day
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Limited time offer on premium smartwatch
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={cardRef}
          className="group relative flex flex-col gap-6 rounded-[var(--radius-xl)] bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 shadow-[var(--shadow-strong)] p-8 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {/* Magnetic glow follow */}
          <motion.div
            className="absolute w-40 h-40 bg-primary/30 rounded-full blur-3xl pointer-events-none"
            style={{
              left: mouseX,
              top: mouseY,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.6 }}
          />

          {/* Deal Badge */}
          <motion.div
            className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-4 w-4 fill-current" />
            <span className="font-bold uppercase tracking-wider text-xs">HOT DEAL</span>
          </motion.div>

          {/* Like button */}
          <motion.button
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-background-dark/80 backdrop-blur rounded-full shadow-md"
            onClick={handleToggleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFav ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Product Image */}
            <motion.div
              className="relative w-full lg:w-1/2 bg-white dark:bg-background-dark/60 rounded-[calc(var(--radius-xl)-0.5rem)] overflow-hidden aspect-square"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                unoptimized
                alt={product.name}
                src={product.image_path || "/placeholder.png"}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                width={1000}
                height={1000}
              />
            </motion.div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 relative" style={{ transform: "translateZ(30px)" }}>
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(4.9)</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                {product.name}
              </h3>

              {/* Price & Discount */}
              <div className="flex items-center gap-3 flex-wrap">
                <motion.div
                  className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-bold text-sm">{discountPercent}% OFF</span>
                </motion.div>
                {product.market_price && (
                  <span className="text-gray-400 line-through text-lg">৳{product.market_price}</span>
                )}
                <motion.span
                  className="text-3xl font-black text-primary"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ৳{product.retails_price}
                </motion.span>
              </div>

              {/* Countdown Timer */}
              <div className="flex gap-2 flex-wrap">
                <CounterBox value={timeLeft.hours} label="Hours" />
                <CounterBox value={timeLeft.minutes} label="Mins" />
                <CounterBox value={timeLeft.seconds} label="Secs" />
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                className="relative flex items-center justify-center gap-2 text-base font-semibold text-white bg-primary/90 hover:bg-primary px-6 py-4 rounded-xl overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                whileHover={{ scale: inCart ? 1 : 1.02, y: inCart ? 0 : -2, boxShadow: "0 0 30px rgba(74, 144, 226, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isAdding || inCart}
              >
                {isAdding ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </motion.div>
                    <span>Adding...</span>
                  </motion.div>
                ) : inCart ? (
                  <>
                    <ShoppingCart className="h-5 w-5 fill-current" />
                    <span>In Cart</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                    <span>Grab Deal Now - Limited Stock!</span>
                  </>
                )}
                
                {/* Shine effect */}
                {!inCart && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Success animation */}
          {isAdding && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-background-dark rounded-full p-6 shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <ShoppingCart className="h-10 w-10 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
