"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Phones", "Accessories", "Wearables", "Audio"];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-lg saturate-150 ${
      scrolled
        ? "bg-white/80 dark:bg-background-dark/70 shadow-lg border-b border-gray-200/60 dark:border-gray-800/60"
        : "bg-white/40 dark:bg-background-dark/40"
    }`}>
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-8 lg:px-10 py-3">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 text-gray-900 dark:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Apple Dream BD
          </h2>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 ml-16">
          {navLinks.map((link, i) => (
            <motion.a
              key={link}
              href="#"
              className="relative text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex flex-1 justify-end items-center gap-3">
          {/* Search Bar */}
          <motion.label
            className="hidden md:flex flex-col min-w-40 h-10 max-w-64"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full overflow-hidden border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="text-gray-500 dark:text-gray-400 flex bg-gray-100/80 dark:bg-background-dark/60 items-center justify-center pl-4 border-r-0">
                <Search className="h-4 w-4" />
              </div>
              <input
                className="flex w-full min-w-0 flex-1 bg-gray-100/80 dark:bg-background-dark/60 text-gray-900 dark:text-white focus:outline-0 border-none h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-sm"
                placeholder="Search products..."
                defaultValue=""
              />
            </div>
          </motion.label>

          <div className="flex gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User */}
            <motion.button
              className="hidden sm:flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="h-5 w-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              className="hidden sm:flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="h-5 w-5" />
            </motion.button>

            {/* Cart with Badge */}
            <motion.button
              className="relative flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 border border-primary/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="flex lg:hidden cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-2 border-b border-gray-100 dark:border-gray-800"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              
              {/* Mobile Search */}
              <motion.div
                className="mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-stretch rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="flex bg-gray-100 dark:bg-background-dark/60 items-center justify-center pl-4">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    className="flex-1 bg-gray-100 dark:bg-background-dark/60 text-gray-900 dark:text-white focus:outline-0 border-none h-10 placeholder:text-gray-500 px-4 text-sm"
                    placeholder="Search..."
                  />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
