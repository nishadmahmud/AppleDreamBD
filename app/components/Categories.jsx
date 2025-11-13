"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Smartphone,
  Watch,
  Headphones,
  Speaker,
  Cable,
  Tablet,
  Gamepad2,
  Shield,
  Wind,
  Battery,
  Pencil,
  Grid3x3,
  Package,
  Camera,
  Wifi,
  Mic,
  Lightbulb,
  Home,
  Laptop,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchCategories } from "../../lib/api";

gsap.registerPlugin(ScrollTrigger);

// Icon and color mapping based on category names
const getCategoryStyle = (categoryName) => {
  const name = categoryName.toLowerCase();
  
  // Define icon and color mappings
  if (name.includes("phone") || name.includes("smartphone")) {
    return {
      icon: Smartphone,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    };
  }
  if (name.includes("watch")) {
    return {
      icon: Watch,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    };
  }
  if (name.includes("earbud")) {
    return {
      icon: Headphones,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    };
  }
  if (name.includes("headphone") || name.includes("earphone")) {
    return {
      icon: Headphones,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    };
  }
  if (name.includes("speaker") || name.includes("soundbar")) {
    return {
      icon: Speaker,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
    };
  }
  if (name.includes("neckband")) {
    return {
      icon: Headphones,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    };
  }
  if (name.includes("cover") || name.includes("glass") || name.includes("case")) {
    return {
      icon: Shield,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    };
  }
  if (name.includes("fan")) {
    return {
      icon: Wind,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    };
  }
  if (name.includes("power") || name.includes("bank")) {
    return {
      icon: Battery,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    };
  }
  if (name.includes("cable") || name.includes("charger") || name.includes("adapter")) {
    return {
      icon: Cable,
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50 dark:bg-lime-900/20",
    };
  }
  if (name.includes("tablet") || name.includes("ipad") || name.includes("pad")) {
    return {
      icon: Tablet,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
    };
  }
  if (name.includes("pen") || name.includes("stylus") || name.includes("pencil")) {
    return {
      icon: Pencil,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    };
  }
  if (name.includes("gamepad") || name.includes("game")) {
    return {
      icon: Gamepad2,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    };
  }
  if (name.includes("camera")) {
    return {
      icon: Camera,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    };
  }
  if (name.includes("router") || name.includes("dongle") || name.includes("hub")) {
    return {
      icon: Wifi,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
    };
  }
  if (name.includes("mic") || name.includes("microphone")) {
    return {
      icon: Mic,
      color: "from-fuchsia-500 to-fuchsia-600",
      bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    };
  }
  if (name.includes("light") || name.includes("lamp")) {
    return {
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    };
  }
  if (name.includes("keyboard") || name.includes("mouse")) {
    return {
      icon: Laptop,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50 dark:bg-slate-900/20",
    };
  }
  
  // Default for unmatched categories
  return {
    icon: Package,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
  };
};

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const Icon = category.icon;
  const hasImage = category.imageUrl && category.imageUrl !== null;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        delay: index * 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <motion.a
      ref={cardRef}
      href={`/products?category=${category.id}`}
      className={`relative group ${category.bgColor} rounded-2xl p-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl`}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Image or Icon */}
      <motion.div
        className="relative mb-3"
        whileHover={{ rotate: hasImage ? 0 : [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        {hasImage ? (
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-200">
            <Image
              src={category.imageUrl}
              alt={category.name}
              width={64}
              height={64}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              unoptimized
            />
          </div>
        ) : (
          <div
            className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-200`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        )}
      </motion.div>

      {/* Category name */}
      <h3 className="text-center text-sm font-bold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10">
        {category.name}
      </h3>

      {/* Product count badge (optional) */}
      {category.productCount !== undefined && (
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
          {category.productCount} items
        </p>
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
};

export default function Categories() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchCategories();
        
        if (response?.success && response?.data) {
          // Map categories - show all or filter by product_count based on your preference
          const filteredCategories = response.data
            // .filter((cat) => cat.product_count > 0) // Uncomment to only show categories with products
            .slice(0, 14) // Show only top 14 categories
            .map((cat) => ({
              id: cat.category_id.toString(),
              name: cat.name,
              productCount: cat.product_count,
              imageUrl: cat.image_url, // Add image URL from API
              ...getCategoryStyle(cat.name), // Fallback icon and colors
            }));
          setCategories(filteredCategories);
        } else {
          console.warn("No category data received");
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
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

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-10 py-20 bg-gray-50 dark:bg-gray-900/30 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Grid3x3 className="h-4 w-4" />
            <span className="text-sm font-semibold">EXPLORE</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our wide range of product categories
          </p>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-32 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No categories available
          </div>
        )}

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
            View All Products →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
