"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { fetchBrandProducts } from "../../lib/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function TopBrandsPicks() {
  const [brands, setBrands] = useState([{ id: 0, name: "All", slug: "all" }]);
  const [selectedBrand, setSelectedBrand] = useState({ id: 0, name: "All", slug: "all" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Fetch brands dynamically from API
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setBrandsLoading(true);
        // Fetch all products (brand ID 0) to get all available brands
        const response = await fetchBrandProducts(0, 1);
        
        if (response?.success && response?.data?.data) {
          // Extract unique brands from products
          const brandsMap = new Map();
          
          // Add "All" as first option
          brandsMap.set(0, { id: 0, name: "All", slug: "all" });
          
          // Extract unique brands from products
          response.data.data.forEach((product) => {
            if (product.brands && product.brands.id) {
              const brandId = product.brands.id;
              if (!brandsMap.has(brandId)) {
                // Create slug from brand name
                const slug = product.brands.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");
                
                brandsMap.set(brandId, {
                  id: brandId,
                  name: product.brands.name,
                  slug: slug,
                  image: product.brands.image_path,
                });
              }
            }
          });
          
          // Convert map to array and sort by name (keeping "All" first)
          const brandsArray = Array.from(brandsMap.values());
          const allBrand = brandsArray.find((b) => b.id === 0);
          const otherBrands = brandsArray
            .filter((b) => b.id !== 0)
            .sort((a, b) => a.name.localeCompare(b.name));
          
          const sortedBrands = allBrand ? [allBrand, ...otherBrands] : otherBrands;
          setBrands(sortedBrands);
          
          // Set selected brand to "All" if it exists
          if (allBrand) {
            setSelectedBrand(allBrand);
          }
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        // Keep default "All" brand on error
      } finally {
        setBrandsLoading(false);
      }
    };

    loadBrands();
  }, []);

  useEffect(() => {
    // Don't load products until brands are loaded
    if (brandsLoading) return;
    
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchBrandProducts(selectedBrand.id, 1);
        
        if (response?.success && response?.data?.data) {
          // Get first 12 products
          setProducts(response.data.data.slice(0, 12));
        } else {
          console.warn("No product data received");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedBrand, brandsLoading]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.retails_price,
      image: product.image_path,
      quantity: 1,
    });
  };

  const handleToggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.retails_price,
        image: product.image_path,
      });
    }
  };

  return (
    <section className="px-4 sm:px-8 lg:px-10 py-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Top Brands Picks
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore products from your favorite brands
          </p>
        </div>

        {/* Brand Tabs */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max pb-2">
            {brandsLoading ? (
              // Loading skeleton for brand tabs
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
                />
              ))
            ) : (
              brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedBrand.id === brand.id
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {brand.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Stock Out Badge */}
                {product.current_stock === 0 && (
                  <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                    Stock Out
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => handleToggleFavorite(product)}
                  className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={product.image_path}
                      alt={product.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      unoptimized
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 ">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                      {product.retails_price} ৳
                    </p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="px-4 pb-4 flex flex-col gap-2">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center"
                  >
                    Buy Now
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.current_stock === 0}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                      product.current_stock === 0
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-900 dark:border-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900"
                    }`}
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No products found for this brand.
          </div>
        )}

        {/* View More Button */}
        {products.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href={`/products?brand=${selectedBrand.id}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              View All {selectedBrand.name !== "All" ? selectedBrand.name : ""}{" "}
              Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

