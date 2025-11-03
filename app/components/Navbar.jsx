"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Moon, Sun, Search, User, Heart, ShoppingBag, Menu, X, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const { cart, getCartCount, getCartTotal, removeFromCart, updateQuantity, addToCart } = useCart();
  const { favorites, removeFromFavorites, toggleFavorite } = useFavorites();
  
  // Safe cart count getter
  const cartCount = getCartCount ? getCartCount() : 0;
  const favCount = favorites ? favorites.length : 0;
  
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);

  // Check if link is active
  const isActiveLink = (href) => {
    if (href.startsWith('#')) {
      return false; // Hash links are handled by scroll position
    }
    return pathname === href;
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setFavoritesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Best Sellers", href: "#best-sellers" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Deals", href: "#deals" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-lg saturate-150 ${
      scrolled
        ? "bg-white/80 dark:bg-background-dark/70 shadow-lg border-b border-gray-200/60 dark:border-gray-800/60"
        : "bg-white/40 dark:bg-background-dark/40"
    }`}>
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-8 lg:px-10 py-3">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-3 text-gray-900 dark:text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-primary">
            Apple Dream BD
          </h2>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 ml-16">
          {navLinks.map((link, i) => {
            const isActive = isActiveLink(link.href);
            return (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium leading-normal transition-colors group whitespace-nowrap ${
                  isActive
                    ? "text-primary dark:text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ scaleX: isActive ? 1 : 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            );
          })}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = '/products';
                  }
                }}
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

            {/* User / Test Button */}
            <motion.button
              onClick={() => {
                console.log("🧪 TEST BUTTON CLICKED");
                console.log("Cart state:", cart);
                console.log("Favorites state:", favorites);
                console.log("Testing addToCart with dummy product...");
                addToCart({ id: 999, name: "Test Product", retails_price: 100, image_path: "/test.jpg" }, 1);
                console.log("Testing toggleFavorite with dummy product...");
                toggleFavorite({ id: 998, name: "Test Favorite", retails_price: 200, image_path: "/test2.jpg" });
              }}
              className="hidden sm:flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Test Cart & Favorites (Debug)"
            >
              <User className="h-5 w-5" />
            </motion.button>

            {/* Wishlist */}
            <div ref={favoritesRef} className="relative hidden sm:block">
              <motion.button
                onClick={() => {
                  setFavoritesOpen(!favoritesOpen);
                  setCartOpen(false);
                }}
                className="relative flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-gray-100/80 dark:bg-background-dark/60 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-background-dark border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`h-5 w-5 ${favCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
                {favCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {favCount}
                  </motion.span>
                )}
              </motion.button>
              
              {/* Favorites Dropdown */}
              <AnimatePresence>
                {favoritesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-lg">Favorites</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{favCount} items</p>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {favCount === 0 ? (
                        <div className="p-8 text-center">
                          <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p className="text-gray-500 dark:text-gray-400">No favorites yet</p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {favorites.map((item) => (
                            <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                <Image
                                  src={item.image_path || item.images?.[0] || "/placeholder.png"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-primary font-semibold text-sm">৳{item.retails_price}</p>
                              </div>
                              <button
                                onClick={() => removeFromFavorites(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {favCount > 0 && (
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            router.push('/products');
                            setFavoritesOpen(false);
                          }}
                          className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
                        >
                          View All
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart with Badge */}
            <div ref={cartRef} className="relative">
              <motion.button
                onClick={() => {
                  setCartOpen(!cartOpen);
                  setFavoritesOpen(false);
                }}
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
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
              
              {/* Cart Dropdown */}
              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-lg">Shopping Cart</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{cartCount} items</p>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {!cart || cart.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                <Image
                                  src={item.image_path || item.images?.[0] || "/placeholder.png"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-primary font-semibold text-sm">৳{item.retails_price}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-6 w-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-6 w-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {cart && cart.length > 0 && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-primary">৳{getCartTotal ? getCartTotal().toFixed(2) : '0.00'}</span>
                        </div>
                        <button
                          onClick={() => {
                            router.push('/checkout');
                            setCartOpen(false);
                          }}
                          className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
                        >
                          Checkout
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              {navLinks.map((link, i) => {
                const isActive = isActiveLink(link.href);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 ${
                      isActive
                        ? "text-primary dark:text-primary font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        className="h-1 w-1 rounded-full bg-primary inline-block ml-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = '/products';
                        setMobileMenuOpen(false);
                      }
                    }}
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
