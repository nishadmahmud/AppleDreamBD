"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "6530",
    name: "Official Phone",
    icon: Smartphone,
    slug: "official-phone",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: "6529",
    name: "Unofficial Phone",
    icon: Smartphone,
    slug: "unofficial-phone",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: "6528",
    name: "Smart Watches",
    icon: Watch,
    slug: "smart-watches",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: "6527",
    name: "EarBuds",
    icon: Headphones,
    slug: "earbuds",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    id: "6526",
    name: "Headphones",
    icon: Headphones,
    slug: "headphones",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: "6525",
    name: "Cover & Glass",
    icon: Shield,
    slug: "cover-glass",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    id: "6523",
    name: "Gadgets",
    icon: Gamepad2,
    slug: "gadgets",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
  {
    id: "6522",
    name: "Neckband",
    icon: Headphones,
    slug: "neckband",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    id: "6521",
    name: "Fan",
    icon: Wind,
    slug: "fan",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "6520",
    name: "Powerbank",
    icon: Battery,
    slug: "powerbank",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    id: "6519",
    name: "Charger & Cable",
    icon: Cable,
    slug: "charger-cable",
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-50 dark:bg-lime-900/20",
  },
  {
    id: "6518",
    name: "iPad & Tablet",
    icon: Tablet,
    slug: "ipad-tablet",
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    id: "6517",
    name: "Speakers",
    icon: Speaker,
    slug: "speakers",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    id: "6516",
    name: "Stylus",
    icon: Pencil,
    slug: "stylus",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
];

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const Icon = category.icon;

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
      className={`relative group ${category.bgColor} rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl`}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon with animated background */}
      <motion.div
        className="relative mb-4"
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-200`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </motion.div>

      {/* Category name */}
      <h3 className="text-center text-sm font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-br group-hover:bg-clip-text transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}
      >
        {category.name}
      </h3>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
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
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
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

