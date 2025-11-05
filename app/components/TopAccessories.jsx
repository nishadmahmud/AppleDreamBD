"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShoppingCart, Heart, Star, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function AccessoryCard({ product, delay = 0, badge = null }) {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

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
    addToCart(product, 1);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const inCart = isInCart(product.id);
  const isFav = isFavorite(product.id);

  return (
    <motion.div
      ref={cardRef}
      data-acc
      className="group relative flex flex-col gap-4 rounded-[var(--radius-xl)] bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 shadow-[var(--shadow-soft)] p-5 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
        className="absolute w-32 h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
      />

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

      {/* Badge */}
      {badge && (
        <motion.div
          className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full"
          initial={{ rotate: -12 }}
          animate={{ rotate: [-12, -10, -12] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-3 w-3" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.div
        className="relative w-full bg-white dark:bg-background-dark/60 rounded-[calc(var(--radius-xl)-0.5rem)] overflow-hidden aspect-square"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          unoptimized
          alt={product.name}
          src={product.image_path || "/placeholder.png"}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          width={1000}
          height={1000}
        />
      </motion.div>

      <div
        className="flex flex-col gap-2 relative flex-1"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            (4.8)
          </span>
        </div>

        <p className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
          {product.name}
        </p>

        <div className="flex items-center gap-2 mb-auto">
          <motion.p
            className="text-2xl font-black text-primary"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            ৳{product.retails_price}
          </motion.p>
          {product.market_price &&
            product.market_price > product.retails_price && (
              <span className="text-sm text-gray-400 line-through">
                ৳{product.market_price}
              </span>
            )}
        </div>

        <motion.button
          onClick={handleAddToCart}
          className="relative flex items-center justify-center gap-2 mt-2 text-sm font-semibold text-white bg-primary/90 hover:bg-primary px-4 py-3 rounded-lg overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: inCart ? 1 : 1.02, y: inCart ? 0 : -2 }}
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
                <ShoppingCart className="h-4 w-4" />
              </motion.div>
              <span>Adding...</span>
            </motion.div>
          ) : inCart ? (
            <>
              <ShoppingCart className="h-4 w-4 fill-current" />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              <span>Add to Cart</span>
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

      {/* Success animation */}
      {isAdding && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-background-dark rounded-full p-4 shadow-xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ShoppingCart className="h-8 w-8 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TopAccessories() {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        // Fetch from multiple accessory categories
        const categories = [
          6527, // EarBuds
          6520, // Powerbank
          6525, // Cover & Glass
          6519, // Charger & Cable
        ];

        const promises = categories.map((catId) =>
          fetch(
            `https://www.outletexpense.xyz/api/public/categorywise-products/${catId}?page=1&limit=1`
          )
            .then((r) => r.json())
            .then((data) =>
              data.success && data.data && data.data.length > 0
                ? data.data[0]
                : null
            )
        );

        const results = await Promise.all(promises);
        const validProducts = results.filter((p) => p !== null);

        setProducts(validProducts);
      } catch (error) {
        console.error("Failed to fetch accessories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-gray-900 dark:text-white text-4xl font-bold mb-3">
          Top Accessories
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Elevate your experience with essential add-ons.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <AccessoryCard
            key={product.id}
            product={product}
            delay={i * 0.1}
            badge={i === 0 ? "BEST SELLER" : null}
          />
        ))}
      </div>
    </section>
  );
}
