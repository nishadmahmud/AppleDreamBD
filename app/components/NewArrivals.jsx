"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, Sparkles, Star, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchNewArrivals } from "../../lib/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

gsap.registerPlugin(ScrollTrigger);

const NewArrivalCard = ({ product, index }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isLiked = isFavorite(product.id);
  const inCart = isInCart(product.id);
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

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        delay: index * 0.12,
        ease: "power3.out",
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
    setIsHovered(false);
  };

  const handleAddToCart = () => {
    const isInStock = product.status === "In stock" || product.current_stock > 0;
    if (isInStock && !inCart) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const isInStock = product.status === "In stock" || product.current_stock > 0;
  const hasDiscount = product.discount > 0;
  const discountedPrice = product.discounted_price || product.retails_price;

  return (
    <motion.div
      ref={cardRef}
      className="relative group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Clickable overlay for product link */}
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0" />
      {/* New Badge - Animated */}
      <motion.div
        className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-gradient-to-r from-blue-500 to-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 150 }}
      >
        <Sparkles className="h-3 w-3" />
        <span>NEW</span>
      </motion.div>

      {/* Discount Badge (if applicable) */}
      {hasDiscount && (
        <motion.div
          className="absolute top-3 right-3 z-20 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.12 + 0.3, type: "spring" }}
        >
          -{product.discount}
          {product.discount_type === "Percentage" ? "%" : "৳"}
        </motion.div>
      )}

      {/* Like & View Buttons */}
      <div className="absolute top-14 right-3 z-20 flex flex-col gap-2">
        <motion.button
          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavorite();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </motion.button>
        
        <motion.button
          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </motion.button>
      </div>

      {/* Product Images */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">

        {/* Main Image */}
        <motion.div
          className="relative w-full h-full z-10"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={product.image_path}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-300"
            style={{ opacity: isHovered && product.image_path1 ? 0 : 1 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Secondary Image on Hover */}
          {product.image_path1 && (
            <Image
              src={product.image_path1}
              alt={`${product.name} - alternate view`}
              fill
              className="object-cover transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0 }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </motion.div>


        {/* Quick Add Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-15 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && isInStock ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 pointer-events-auto"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4" />
            Quick View
          </motion.div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category & Brand */}
        <div className="flex items-center justify-between">
          {product.category_name && (
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              {product.category_name}
            </span>
          )}
          
          {product.brands && product.brands.image_path && (
            <div className="relative w-6 h-6">
              <Image
                src={product.brands.image_path}
                alt={product.brands.name}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < 5
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            5.0
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            (New)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
            ৳{parseFloat(discountedPrice).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.retails_price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Indicator */}
        {isInStock && (
          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>In Stock ({product.current_stock} available)</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all relative z-10 ${
            isInStock
              ? inCart || addedToCart
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={!isInStock || inCart}
          whileHover={isInStock && !inCart ? { scale: 1.02 } : {}}
          whileTap={isInStock && !inCart ? { scale: 0.98 } : {}}
        >
          {inCart || addedToCart ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                ✓
              </motion.div>
              {addedToCart ? "Added!" : "In Cart"}
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </motion.button>
      </div>

      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const loadNewArrivals = async () => {
      try {
        const response = await fetchNewArrivals();
        if (response.success && response.data && response.data.data) {
          // Get products from nested data structure
          setProducts(response.data.data.slice(0, 8));
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch new arrivals:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNewArrivals();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300">
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
      <section className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 dark:text-red-400">
            Failed to load new arrivals: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="new-arrivals"
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-primary/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4 border border-blue-500/30"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-bold">JUST ARRIVED</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-black mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              New Arrivals
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Be the first to discover our latest products with cutting-edge features
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <NewArrivalCard key={product.id} product={product} index={index} />
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
          <motion.a
            href="/products"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All New Products →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

