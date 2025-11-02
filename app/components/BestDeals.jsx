"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, Zap, Tag, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchBestDeals } from "../../lib/api";

gsap.registerPlugin(ScrollTrigger);

const DealCard = ({ product, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isInStock = product.status === "In stock" || product.current_stock > 0;
  
  // Calculate discount percentage if not provided
  const discountPercentage = product.discount_type === "Percentage" 
    ? product.discount 
    : Math.round(product.discount_rate);

  return (
    <motion.div
      ref={cardRef}
      className="relative group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Discount Badge - Top Left */}
      <motion.div
        className="absolute top-3 left-3 z-20 bg-gradient-to-br from-blue-500 to-primary text-white px-3 py-2 rounded-xl shadow-lg"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: -12 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="flex flex-col items-center leading-none">
          <span className="text-2xl font-black">{discountPercentage}%</span>
          <span className="text-[10px] font-semibold">OFF</span>
        </div>
      </motion.div>

      {/* Limited Time Badge - Top Right */}
      <motion.div
        className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="h-3 w-3" />
        <span>DEAL</span>
      </motion.div>

      {/* Like Button */}
      <motion.button
        className="absolute top-14 right-3 z-20 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
        onClick={() => setIsLiked(!isLiked)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </motion.button>

      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-primary/10"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div
          className="relative w-full h-full z-10"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={product.image_path}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-primary/10 dark:from-blue-900/20 dark:to-primary/20 rounded-lg px-3 py-2">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
            <span>{String(timeLeft.hours).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Brand */}
        {product.brands && (
          <div className="flex items-center gap-2">
            {product.brands.image_path && (
              <div className="relative w-6 h-6">
                <Image
                  src={product.brands.image_path}
                  alt={product.brands.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {product.brands.name}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Stock Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((product.current_stock / 100) * 100, 100)}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.current_stock} left
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              ৳{product.discounted_price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ৳{product.retails_price.toLocaleString()}
            </span>
          </div>
          
          {/* Savings Amount */}
          <motion.div
            className="flex items-center gap-1 text-primary dark:text-primary text-sm font-semibold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Tag className="h-4 w-4" />
            <span>
              You save ৳{(product.retails_price - product.discounted_price).toLocaleString()}
            </span>
          </motion.div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isInStock
              ? addedToCart
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-primary text-white hover:from-blue-600 hover:to-primary/90"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleAddToCart}
          disabled={!isInStock || addedToCart}
          whileHover={isInStock ? { scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" } : {}}
          whileTap={isInStock ? { scale: 0.98 } : {}}
        >
          {addedToCart ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                ✓
              </motion.div>
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              {isInStock ? "Grab the Deal" : "Sold Out"}
            </>
          )}
        </motion.button>
      </div>

      {/* Shine Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default function BestDeals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const loadBestDeals = async () => {
      try {
        const response = await fetchBestDeals();
        if (response.success && response.data) {
          // Get top 8 best deals
          setProducts(response.data.slice(0, 8));
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch best deals:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBestDeals();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-12 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-[450px] animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 dark:text-red-400">
            Failed to load best deals: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-primary/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4 border border-blue-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold">SPECIAL OFFERS</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              Best Deals
            </span>
          </motion.h2>
          
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Grab these amazing deals before they&apos;re gone! Limited stock available.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <DealCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Deals →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

