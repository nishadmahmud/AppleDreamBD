import ProductDetailClient from "./ProductDetailClient.jsx";

export const metadata = {
  title: "Product Details",
  description:
    "Compare specs, pricing, colors, storage, and region options for every Apple Dream BD device.",
};

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Check,
  Package,
  Truck,
  Shield,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import { fetchProductDetail, getAllCategories } from "../../../lib/api";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const {
    addToCart,
    isInCart,
    updateQuantity: updateCartQuantity,
    cart,
  } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [similar, setSimilar] = useState([]);
  
  // Variant state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductDetail(productId);

        if (response.success && response.data) {
          const productData = response.data;
          setProduct(productData);
          
          // Initialize variants if available
          if (productData.imeis && productData.imeis.length > 0) {
            const variants = productData.imeis.filter(v => v.in_stock === 1);
            if (variants.length > 0) {
              // Get unique colors, storages, and regions
              const colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
              const storages = [...new Set(variants.map(v => v.storage).filter(Boolean))];
              const regions = [...new Set(variants.map(v => v.region).filter(Boolean))];
              
              // Set initial selections
              if (colors.length > 0) setSelectedColor(colors[0]);
              if (storages.length > 0) setSelectedStorage(storages[0]);
              if (regions.length > 0) setSelectedRegion(regions[0]);
            }
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load product");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Update selected variant when selections change
  // Now considers color, storage, AND region
  useEffect(() => {
    if (!product || !product.imeis || product.imeis.length === 0) return;
    
    // Find variant matching ALL selected options (color, storage, region)
    const exactMatch = product.imeis.find(v => 
      v.in_stock === 1 &&
      (!selectedColor || v.color === selectedColor) &&
      (!selectedStorage || v.storage === selectedStorage) &&
      (!selectedRegion || v.region === selectedRegion)
    );
    
    // Find variant matching storage and region (for price)
    const storageRegionMatch = product.imeis.find(v => 
      v.in_stock === 1 &&
      (!selectedStorage || v.storage === selectedStorage) &&
      (!selectedRegion || v.region === selectedRegion)
    );
    
    // Find variant matching storage only (fallback)
    const storageMatch = product.imeis.find(v => 
      v.in_stock === 1 &&
      (!selectedStorage || v.storage === selectedStorage)
    );
    
    // Use exact match if available, otherwise use storage+region match, then storage match
    const finalVariant = exactMatch || storageRegionMatch || storageMatch || product.imeis.find(v => v.in_stock === 1);
    
    console.log('🔍 Variant Selection Debug:', {
      productId: product.id,
      selectedColor,
      selectedStorage,
      selectedRegion,
      exactMatch: exactMatch ? {
        color: exactMatch.color,
        storage: exactMatch.storage,
        region: exactMatch.region,
        price: exactMatch.sale_price
      } : 'none',
      storageRegionMatch: storageRegionMatch ? {
        color: storageRegionMatch.color,
        storage: storageRegionMatch.storage,
        region: storageRegionMatch.region,
        price: storageRegionMatch.sale_price
      } : 'none',
      finalVariant: finalVariant ? {
        color: finalVariant.color,
        storage: finalVariant.storage,
        region: finalVariant.region,
        price: finalVariant.sale_price
      } : 'none'
    });
    
    setSelectedVariant(finalVariant);
  }, [product, selectedColor, selectedStorage, selectedRegion]);

  // Persist recently viewed and fetch similar
  useEffect(() => {
    if (!product) return;
    // Recently viewed (localStorage)
    try {
      const key = "recently_viewed";
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      const minimal = {
        id: product.id,
        name: product.name,
        image_path: product.image_path || product.images?.[0] || null,
        retails_price: product.retails_price,
      };
      const next = [
        minimal,
        ...stored.filter((p) => p.id !== product.id),
      ].slice(0, 12);
      localStorage.setItem(key, JSON.stringify(next));
      setRecentlyViewed(next.filter((p) => p.id !== product.id));
    } catch {}

    // Similar products: prefer same category, else same brand
    const loadSimilar = async () => {
      try {
        const catId =
          product.category_id || product.categoryId || product.category_id_fk;
        if (catId) {
          const res = await fetch(
            `https://www.outletexpense.xyz/api/public/categorywise-products/${catId}?page=1&limit=20`
          );
          const data = await res.json();
          const list =
            data?.success && Array.isArray(data?.data) ? data.data : [];
          setSimilar(list.filter((p) => p.id !== product.id).slice(0, 8));
          return;
        }
        if (product.brand_id) {
          const res = await fetch(
            `https://www.outletexpense.xyz/api/public/brandwise-products/${product.brand_id}/188?page=1`
          );
          const data = await res.json();
          const list =
            data?.success && Array.isArray(data?.data) ? data.data : [];
          setSimilar(list.filter((p) => p.id !== product.id).slice(0, 8));
        }
      } catch (e) {
        console.warn("Similar products fetch failed", e);
      }
    };
    loadSimilar();
  }, [product]);

  // Get all available product images
  const productImages =
    product?.images && product.images.length > 0
      ? product.images.filter(Boolean)
      : [];

  // Get available variants
  const availableVariants = product?.imeis?.filter(v => v.in_stock === 1) || [];
  const hasVariants = availableVariants.length > 0;
  
  // Get unique options from variants with color codes
  const availableColors = hasVariants 
    ? [...new Set(availableVariants.map(v => v.color).filter(Boolean))]
    : [];
  
  // Create color name to color code mapping
  const colorCodeMap = {};
  if (hasVariants) {
    availableVariants.forEach(v => {
      if (v.color && v.color_code) {
        colorCodeMap[v.color] = v.color_code;
      }
    });
  }
  
  const availableStorages = hasVariants 
    ? [...new Set(availableVariants.map(v => v.storage).filter(Boolean))]
    : [];
  const availableRegions = hasVariants 
    ? [...new Set(availableVariants.map(v => v.region).filter(Boolean))]
    : [];
  
  // Current region from selection
  const currentRegion = selectedRegion || selectedVariant?.region || null;

  // Use variant price if available, otherwise use product price
  const currentPrice = selectedVariant?.sale_price || product?.retails_price;
  const isInStock = hasVariants 
    ? selectedVariant?.in_stock === 1
    : product?.status === "In Stock" || product?.current_stock > 0;
  
  // Debug price calculation
  console.log('💰 Price Debug:', {
    productId: product?.id,
    selectedVariantPrice: selectedVariant?.sale_price,
    productRetailsPrice: product?.retails_price,
    currentPrice,
    hasVariants,
    selectedVariantInfo: selectedVariant ? {
      id: selectedVariant.id,
      color: selectedVariant.color,
      storage: selectedVariant.storage,
      price: selectedVariant.sale_price
    } : 'none'
  });
  const hasDiscount = product?.discount > 0 && product?.discount_type !== "0";
  const discountedPrice =
    hasDiscount && product?.discounted_price
      ? parseFloat(product.discounted_price)
      : hasDiscount && product?.discount_type === "Percentage"
      ? currentPrice - (currentPrice * product.discount) / 100
      : hasDiscount && product?.discount_type === "Fixed"
      ? currentPrice - product.discount
      : currentPrice;
  const originalPrice = currentPrice;

  const handleAddToCart = () => {
    if (product && isInStock && !isInCart(product.id)) {
      // Create a product object with variant info
      const productToAdd = {
        ...product,
        selectedVariant: selectedVariant ? {
          color: selectedColor,
          storage: selectedStorage,
          region: selectedRegion || currentRegion,
          price: selectedVariant.sale_price,
          variantId: selectedVariant.id
        } : null,
        // Use variant price if available
        retails_price: currentPrice
      };
      addToCart(productToAdd, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product?.current_stock || 1))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image skeleton */}
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-[500px] animate-pulse" />
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Product Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Navbar />

      {/* Back button */}
      <div className="pt-6 pb-6 px-4 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </div>
      </div>

      {/* Product Content */}
      <div className="pb-20 px-4 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-3">
              {/* Main Image */}
              <motion.div
                className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {productImages.length > 0 &&
                productImages[selectedImageIndex] ? (
                  <Image
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <Package className="w-16 h-16" />
                  </div>
                )}

                {/* Like Button */}
                <motion.button
                  className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-md"
                  onClick={() => product && toggleFavorite(product)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      product && isFavorite(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </motion.button>

                {/* Discount Badge */}
                {hasDiscount && (
                  <motion.div
                    className="absolute top-2 left-2 z-10 bg-gradient-to-br from-blue-500 to-primary text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.discount}
                    {product.discount_type === "Percentage" ? "% OFF" : "৳ OFF"}
                  </motion.div>
                )}
              </motion.div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              {/* Brand */}
              {product.brand_name && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {product.brand_image && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={product.brand_image}
                        alt={product.brand_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {product.brand_name}
                  </span>
                </motion.div>
              )}

              {/* Product Name */}
              <motion.h1
                className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {product.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < 5
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  4.5 (120 reviews)
                </span>
              </motion.div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Color:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => {
                      const colorCode = colorCodeMap[color];
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10 dark:bg-primary/20"
                              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50"
                          }`}
                        >
                          {/* Color Swatch */}
                          {colorCode && (
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                                isSelected
                                  ? "border-primary shadow-md ring-2 ring-primary/30"
                                  : "border-gray-300 dark:border-gray-500"
                              }`}
                              style={{
                                backgroundColor: colorCode,
                              }}
                              title={color}
                            />
                          )}
                          {/* Color Name */}
                          <span
                            className={
                              isSelected
                                ? "text-primary font-bold"
                                : "text-gray-700 dark:text-gray-300"
                            }
                          >
                            {color}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Storage Selection */}
              {availableStorages.length > 0 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                >
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Storage:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableStorages.map((storage) => {
                      // Format storage display (handle "256" -> "256GB", "1TB" -> "1TB")
                      const displayStorage = storage.includes('TB') || storage.includes('GB') 
                        ? storage 
                        : `${storage}GB`;
                      return (
                        <button
                          key={storage}
                          onClick={() => setSelectedStorage(storage)}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                            selectedStorage === storage
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary/50"
                          }`}
                        >
                          {displayStorage}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Region Selection */}
              {availableRegions.length > 0 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.37 }}
                >
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Region:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableRegions.map((region) => (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                          selectedRegion === region
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary/50"
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Price */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ৳
                    {discountedPrice?.toLocaleString() ||
                      originalPrice?.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        ৳{originalPrice?.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                        Save ৳
                        {(originalPrice - discountedPrice).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Stock Status */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isInStock ? (
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      In Stock ({product.current_stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                    <Package className="w-4 h-4" />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </motion.div>

              {/* Quantity Selector */}
              {isInStock && (
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1.5 font-semibold min-w-[40px] text-center text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.current_stock}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {/* Buy Now Button */}
                <motion.button
                  className={`flex-1 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm transition-all ${
                    isInStock
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (product && isInStock) {
                      // Create a product object with variant info
                      const productToAdd = {
                        ...product,
                        selectedVariant: selectedVariant ? {
                          color: selectedColor,
                          storage: selectedStorage,
                          region: selectedRegion || currentRegion,
                          price: selectedVariant.sale_price,
                          variantId: selectedVariant.id
                        } : null,
                        // Use variant price if available
                        retails_price: currentPrice
                      };
                      addToCart(productToAdd, quantity);
                      // Redirect to checkout
                      router.push("/checkout");
                    }
                  }}
                  disabled={!isInStock}
                  whileHover={isInStock ? { scale: 1.02 } : {}}
                  whileTap={isInStock ? { scale: 0.98 } : {}}
                >
                  {isInStock ? "Buy Now" : "Out of Stock"}
                </motion.button>

                {/* Add to Cart Button */}
                <motion.button
                  className={`flex-1 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm transition-all ${
                    isInStock
                      ? (product && isInCart(product.id)) || addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-primary hover:bg-primary/90 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleAddToCart}
                  disabled={!isInStock || (product && isInCart(product.id))}
                  whileHover={
                    isInStock && !(product && isInCart(product.id))
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    isInStock && !(product && isInCart(product.id))
                      ? { scale: 0.98 }
                      : {}
                  }
                >
                  {(product && isInCart(product.id)) || addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      {addedToCart ? "Added!" : "In Cart"}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div
                className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Free Shipping</p>
                    <p className="text-[10px] text-gray-500">Over ৳5000</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Warranty</p>
                    <p className="text-[10px] text-gray-500">1 Year</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Easy Returns</p>
                    <p className="text-[10px] text-gray-500">7 Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Support</p>
                    <p className="text-[10px] text-gray-500">24/7</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Product Description
              </h2>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </motion.div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Specifications
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {product.specifications.map((spec, index) => (
                  <motion.div
                    key={spec.id || index}
                    className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[100px] text-xs">
                      {spec.name.replace(":", "")}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-xs">
                      {spec.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <div className="px-4 sm:px-8 lg:px-10 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recentlyViewed.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.image_path || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    ৳{item.retails_price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Similar Products */}
      {similar && similar.length > 0 && (
        <div className="px-4 sm:px-8 lg:px-10 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similar.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.image_path || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.discount_type === "percentage"
                          ? `-${item.discount}%`
                          : `-৳${item.discount}`}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    ৳{item.retails_price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
