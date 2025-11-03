"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Grid3x3,
  List,
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  ArrowUpDown,
  Filter,
  Loader2
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchAllProducts, getAllCategories } from "../../lib/api";

// Product Card Component
const ProductCard = ({ product, viewMode }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const isInStock = product.status === "In stock" || product.current_stock > 0;

  if (viewMode === "list") {
    return (
      <motion.div
        className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex cursor-pointer group"
        onClick={handleCardClick}
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
      >
        {/* Image */}
        <div className="relative w-48 h-48 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image_path}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="192px"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount_type === "percentage" ? `${product.discount}%` : `৳${product.discount}`}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">4.5</span>
            </div>

            {/* Stock Status */}
            <div className="mb-3">
              <span className={`text-sm font-medium ${isInStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isInStock ? `${product.current_stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ৳{product.retails_price.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{(product.retails_price + (product.discount_type === "percentage" 
                    ? (product.retails_price * product.discount) / 100 
                    : product.discount)).toLocaleString()}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`} />
              </motion.button>
              
              <motion.button
                onClick={handleAddToCart}
                disabled={!isInStock || addedToCart}
                className={`px-6 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  isInStock
                    ? addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={isInStock ? { scale: 1.05 } : {}}
                whileTap={isInStock ? { scale: 0.95 } : {}}
              >
                {addedToCart ? (
                  <>✓ Added</>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer group"
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image_path}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{product.discount_type === "percentage" ? `${product.discount}%` : `৳${product.discount}`}
          </div>
        )}

        {/* Like Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="space-y-2 flex-1">
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
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">4.5</span>
          </div>

          {/* Stock Status */}
          <div className="text-xs font-medium">
            <span className={isInStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {isInStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-bold text-primary">
              ৳{product.retails_price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ৳{(product.retails_price + (product.discount_type === "percentage" 
                  ? (product.retails_price * product.discount) / 100 
                  : product.discount)).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={!isInStock || addedToCart}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-3 ${
            isInStock
              ? addedToCart
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
          whileHover={isInStock ? { scale: 1.02 } : {}}
          whileTap={isInStock ? { scale: 0.98 } : {}}
        >
          {addedToCart ? (
            <>✓ Added</>
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

// Main Products Page Component
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI States
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, newest
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  
  const categories = getAllCategories();

  // Handle URL params for category selection
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Cache for API responses
  const cacheRef = useRef({
    all: null,
    categories: {}
  });

  // Fetch products - with caching
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let allProducts = [];

        if (selectedCategories.length > 0) {
          const categoryId = selectedCategories[0];
          
          // Check cache first
          if (cacheRef.current.categories[categoryId]) {
            allProducts = cacheRef.current.categories[categoryId];
            setLoading(false);
          } else {
            // Fetch from API
            const response = await fetch(`https://www.outletexpense.xyz/api/public/categorywise-products/${categoryId}?page=1&limit=200`);
            const data = await response.json();
            
            if (data.success && data.data) {
              allProducts = data.data;
              // Cache it
              cacheRef.current.categories[categoryId] = allProducts;
            }
          }
        } else {
          // "All Products" - fetch from ALL categories and combine
          if (cacheRef.current.all) {
            allProducts = cacheRef.current.all;
            setLoading(false);
          } else {
            // Fetch from all category endpoints
            const categoryPromises = categories.map(category => 
              fetch(`https://www.outletexpense.xyz/api/public/categorywise-products/${category.id}?page=1&limit=200`)
                .then(r => r.json())
                .then(data => data.success ? data.data : [])
                .catch(() => [])
            );
            
            const categoryResults = await Promise.all(categoryPromises);
            allProducts = categoryResults.flat();
            
            // Remove duplicates by product ID
            const uniqueProducts = Array.from(
              new Map(allProducts.map(p => [p.id, p])).values()
            );
            allProducts = uniqueProducts;
            
            // Cache it
            cacheRef.current.all = allProducts;
          }
        }

        setProducts(allProducts);
        
        // Calculate max price
        if (allProducts.length > 0) {
          const maxPrice = Math.max(...allProducts.map(p => p.retails_price));
          setPriceRange([0, maxPrice]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategories]);

  // Apply filters and search (category filter now handled in fetch)
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    result = result.filter(product =>
      product.retails_price >= priceRange[0] && product.retails_price <= priceRange[1]
    );

    // Stock filter
    if (inStockOnly) {
      result = result.filter(product => 
        product.status === "In stock" || product.current_stock > 0
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.retails_price - b.retails_price);
        break;
      case "price-high":
        result.sort((a, b) => b.retails_price - a.retails_price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "popular":
        result.sort((a, b) => (b.total_sales_qty || 0) - (a.total_sales_qty || 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, priceRange, sortBy, inStockOnly]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, Math.max(...products.map(p => p.retails_price))]);
    setInStockOnly(false);
    setSearchQuery("");
    setSortBy("featured");
  };

  const activeFiltersCount = selectedCategories.length + (inStockOnly ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar />
        <div className="pt-24 px-4 sm:px-8 lg:px-10 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              {/* Premium Loading Spinner */}
              <div className="relative w-20 h-20">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {/* Spinning gradient ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner pulsing dot */}
                <motion.div
                  className="absolute inset-0 m-auto w-3 h-3 bg-primary rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              {/* Loading text */}
              <motion.p
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Loading products...
              </motion.p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar />
        <div className="pt-24 px-4 sm:px-8 lg:px-10 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400 text-lg">
                Failed to load products: {error}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-8 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              All Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our complete collection of {products.length} amazing products
            </p>
          </motion.div>

          {/* Category Cards - Horizontal Scroll - Compact */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 pb-1 min-w-max">
                  {/* All Category */}
                  <motion.button
                    onClick={() => setSelectedCategories([])}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      selectedCategories.length === 0
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Grid3x3 className="h-3 w-3" />
                    All
                  </motion.button>

                  {/* Category Cards */}
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => {
                        if (selectedCategories.includes(category.id)) {
                          setSelectedCategories([]);
                        } else {
                          setSelectedCategories([category.id]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        selectedCategories.includes(category.id)
                          ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Gradient fade */}
              <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Search and Filters Bar - Compact */}
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-2">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      selectedCategories.length > 0
                        ? `Search in ${categories.find(c => c.id === selectedCategories[0])?.name || 'category'}...`
                        : "Search products..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter & Sort Controls */}
              <div className="flex gap-2">
                {/* More Filters */}
                <motion.button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all text-gray-900 dark:text-white font-medium relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {inStockOnly && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-[10px] font-bold text-white bg-primary rounded-full">
                      1
                    </span>
                  )}
                </motion.button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all text-gray-900 dark:text-white font-medium cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex gap-0.5 p-0.5 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <motion.button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <List className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Active Filters - Compact */}
            {(inStockOnly || searchQuery) && (
              <motion.div
                className="flex items-center gap-1.5 flex-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                {searchQuery && (
                  <motion.div
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Search className="h-3 w-3" />
                    "{searchQuery}"
                  </motion.div>
                )}
                {inStockOnly && (
                  <motion.button
                    onClick={() => setInStockOnly(false)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    In Stock
                    <X className="h-3 w-3" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                className="mb-8 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 space-y-6">
                  {/* Stock Status */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Availability
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                        Show in-stock items only
                      </span>
                    </label>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Price Range
                    </h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-32 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-primary"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-32 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-primary"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <motion.div
            className="mb-6 text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </motion.div>

          {/* Products Grid/List */}
          {currentProducts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search query
                </p>
                <motion.button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear all filters
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="mt-12 flex justify-center items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white font-medium hover:border-primary transition-all"
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                Previous
              </motion.button>

              <div className="flex gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-primary"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white font-medium hover:border-primary transition-all"
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

