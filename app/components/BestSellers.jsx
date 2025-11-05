"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, TrendingUp, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchBestSellers } from "../../lib/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, index }) => {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);
  const cardRef = useRef(null);

  const isLiked = isFavorite(product.id);
  const inCart = isInCart(product.id);

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
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: index * 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
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

  const handleCardClick = (e) => {
    // Only navigate if not clicking on a button
    if (!e.target.closest("button")) {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.15 }}
    >
      {/* Best Seller Badge */}
      <motion.div
        className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-gradient-to-r from-blue-500 to-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
        initial={{ rotate: -12, scale: 0 }}
        animate={{ rotate: -12, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
      >
        <TrendingUp className="h-3 w-3" />
        <span>BEST SELLER</span>
      </motion.div>

      {/* Like Button */}
      <motion.button
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
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
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.1 }}
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
      <div className="p-4 flex flex-col">
        <div className="space-y-2">
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
                  i < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              4.5
            </span>
          </div>

          {/* Sales Count */}
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <TrendingUp className="h-3 w-3" />
            <span>{product.total_sales_qty} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ৳{product.retails_price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ৳
                  {(
                    product.retails_price +
                    (product.discount_type === "percentage"
                      ? (product.retails_price * product.discount) / 100
                      : product.discount)
                  ).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                  {product.discount_type === "percentage"
                    ? `-${product.discount}%`
                    : `-৳${product.discount}`}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Always at bottom */}
        <motion.button
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-3 relative z-10 ${
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
    </motion.div>
  );
};

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        const response = await fetchBestSellers();
        if (response.success && response.data) {
          // Get top 8 best sellers
          setProducts(response.data.slice(0, 8));
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch best sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBestSellers();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
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
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-[400px] animate-pulse"
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
            Failed to load best sellers: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="best-sellers"
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-background-light dark:bg-background-dark transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">HOT SELLING</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Best Sellers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular products loved by thousands of customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
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
            View All Best Sellers →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
