"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import {
  Moon,
  Sun,
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCategories } from "../../lib/api";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const { isDark, toggleTheme } = useTheme();
  const {
    cart,
    getCartCount,
    getCartTotal,
    removeFromCart,
    updateQuantity,
    addToCart,
  } = useCart();
  const { favorites, removeFromFavorites, toggleFavorite } = useFavorites();

  // Safe cart count getter
  const cartCount = getCartCount ? getCartCount() : 0;
  const favCount = favorites ? favorites.length : 0;

  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const searchRef = useRef(null);
  const abortRef = useRef(null);
  const cacheRef = useRef({});
  const allProductsRef = useRef(null);
  const isFetchingProductsRef = useRef(false);

  // Check if link is active
  const isActiveLink = (href) => {
    if (href.startsWith("#")) {
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
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        setFavoritesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load recent searches
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(
        localStorage.getItem("recent_searches") || "[]"
      );
      if (Array.isArray(stored)) setRecentSearches(stored.slice(0, 5));
    } catch {}
  }, []);

  const pushToProducts = (q) => {
    const query = (q ?? searchQuery).trim();
    if (!query) return;
    if (typeof window !== "undefined") {
      try {
        const next = [
          query,
          ...recentSearches.filter((s) => s !== query),
        ].slice(0, 5);
        setRecentSearches(next);
        localStorage.setItem("recent_searches", JSON.stringify(next));
      } catch {}
    }
    router.push(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  // Pre-fetch products when search is first opened (lazy loading)
  const fetchAllProductsForSearch = async () => {
    if (allProductsRef.current || isFetchingProductsRef.current) {
      return; // Already cached or currently fetching
    }

    try {
      isFetchingProductsRef.current = true;
      const categories = getAllCategories();
      // Reduced limit per category for faster loading (20 products per category is enough for search)
      const promises = categories.map((c) =>
        fetch(
          `https://www.outletexpense.xyz/api/public/categorywise-products/${c.id}?page=1&limit=20`
        )
          .then((r) => r.json())
          .then((d) => (d?.success && Array.isArray(d?.data) ? d.data : []))
          .catch(() => [])
      );
      const results = await Promise.all(promises);
      const combined = results.flat();
      // Deduplicate by id
      const unique = Array.from(
        new Map(combined.map((p) => [p.id, p])).values()
      );
      allProductsRef.current = unique;
    } catch (error) {
      console.error("Error fetching products for search:", error);
    } finally {
      isFetchingProductsRef.current = false;
    }
  };

  // Debounced suggestions (filter from cached products)
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoadingSuggestions(true);
        
        // If products not cached yet, fetch them first
        if (!allProductsRef.current && !isFetchingProductsRef.current) {
          await fetchAllProductsForSearch();
        }
        
        // Wait a bit if still fetching
        if (isFetchingProductsRef.current) {
          // Poll until fetch is complete (max 5 seconds)
          let attempts = 0;
          while (isFetchingProductsRef.current && attempts < 50) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            attempts++;
          }
        }

        // Now filter from cached products
        if (allProductsRef.current && allProductsRef.current.length > 0) {
          const lower = q.toLowerCase();
          const filtered = allProductsRef.current
            .filter((p) => (p?.name || "").toLowerCase().includes(lower))
            .slice(0, 5);
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error filtering suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 200); // Reduced debounce from 300ms to 200ms for faster response

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Best Sellers", href: "/#best-sellers" },
    { name: "New Arrivals", href: "/#new-arrivals" },
    { name: "Deals", href: "/#deals" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-lg saturate-150 ${
        scrolled
          ? "bg-white/80 dark:bg-background-dark/70 shadow-lg border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-white/40 dark:bg-background-dark/40"
      }`}
    >
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-8 lg:px-10 py-3">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center text-gray-900 dark:text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            unoptimized
            src="/logo.png"
            alt="Apple Dream BD"
            width={120}
            height={100}
            className="object-contain"
          />
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
            ref={searchRef}
            className="hidden md:flex flex-col min-w-40 h-10 max-w-64 relative"
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
                  if (e.key === "Enter") {
                    pushToProducts();
                  } else if (e.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
                onFocus={() => {
                  setSearchOpen(true);
                  // Pre-fetch products when search is first opened (lazy loading)
                  if (!allProductsRef.current && !isFetchingProductsRef.current) {
                    fetchAllProductsForSearch();
                  }
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-11 left-0 right-0 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden"
                  role="listbox"
                >
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500">
                        Recent
                      </div>
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => pushToProducts(term)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}

                  {searchQuery && (
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {loadingSuggestions ? (
                        <div className="px-3 py-6 text-center text-sm text-gray-500">
                          Searching…
                        </div>
                      ) : suggestions.length === 0 ? (
                        <div className="px-3 py-6 text-center text-sm text-gray-500">
                          No matches
                        </div>
                      ) : (
                        suggestions.map((p) => (
                          <a
                            key={p.id}
                            href={`/product/${p.id}`}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                            role="option"
                          >
                            <div className="relative w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                              <Image
                                src={p.image_path || "/placeholder.png"}
                                alt={p.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-gray-900 dark:text-white truncate">
                                {p.name}
                              </div>
                              <div className="text-xs text-primary font-semibold">
                                ৳{p.retails_price}
                              </div>
                            </div>
                          </a>
                        ))
                      )}
                      <div className="mt-1 px-3">
                        <button
                          onClick={() => pushToProducts()}
                          className="w-full text-sm py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30"
                        >
                          Search all for “{searchQuery}”
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
                <Heart
                  className={`h-5 w-5 ${
                    favCount > 0
                      ? "fill-rose-500/80 text-rose-500/80 dark:fill-rose-400/80 dark:text-rose-400/80"
                      : ""
                  }`}
                />
                {favCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-rose-500/80 dark:bg-rose-400/80 rounded-full"
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
                    className="fixed sm:absolute right-4 sm:right-0 left-4 sm:left-auto mt-2 sm:w-80 max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-lg">Favorites</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {favCount} items
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {favCount === 0 ? (
                        <div className="p-8 text-center">
                          <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No favorites yet
                          </p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {favorites.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            >
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                <Image
                                  src={
                                    item.image_path ||
                                    item.images?.[0] ||
                                    "/placeholder.png"
                                  }
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                  {item.name}
                                </h4>
                                <p className="text-primary font-semibold text-sm">
                                  ৳{item.retails_price}
                                </p>
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
                            router.push("/products");
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
                    className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-rose-500/80 dark:bg-rose-400/80 rounded-full"
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
                    className="fixed sm:absolute right-4 sm:right-0 left-4 sm:left-auto mt-2 sm:w-96 max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-lg">Shopping Cart</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cartCount} items
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {!cart || cart.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p className="text-gray-500 dark:text-gray-400">
                            Your cart is empty
                          </p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            >
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                <Image
                                  src={
                                    item.image_path ||
                                    item.images?.[0] ||
                                    "/placeholder.png"
                                  }
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                  {item.name}
                                </h4>
                                <p className="text-primary font-semibold text-sm">
                                  ৳{item.retails_price}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="h-6 w-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="text-sm font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
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
                          <span className="text-xl font-bold text-primary">
                            ৳{getCartTotal ? getCartTotal().toFixed(2) : "0.00"}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            router.push("/checkout");
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
                      if (e.key === "Enter") {
                        const val = e.currentTarget.value.trim();
                        if (val)
                          router.push(
                            `/products?search=${encodeURIComponent(val)}`
                          );
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
