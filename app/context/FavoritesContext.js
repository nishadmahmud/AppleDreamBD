"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          console.log("Loaded favorites from localStorage:", parsedFavorites);
          setFavorites(parsedFavorites);
        } catch (error) {
          console.error("Failed to parse favorites:", error);
        }
      }
    }
    setIsLoading(false);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      console.log("Saving favorites to localStorage:", favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const addToFavorites = (product) => {
    console.log("❤️ ADD TO FAVORITES CALLED");
    console.log("Product:", product);
    console.log("Current favorites:", favorites);
    
    setFavorites((prevFavorites) => {
      console.log("Previous favorites:", prevFavorites);
      const exists = prevFavorites.find((item) => item.id === product.id);
      if (exists) {
        console.log("⚠️ Already in favorites");
        return prevFavorites;
      }
      const newFavorites = [...prevFavorites, product];
      console.log("✅ New favorites after add:", newFavorites);
      return newFavorites;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  const toggleFavorite = (product) => {
    console.log("🔄 TOGGLE FAVORITE CALLED");
    console.log("Product:", product);
    console.log("Is favorite?", isFavorite(product.id));
    
    if (isFavorite(product.id)) {
      console.log("➖ Removing from favorites");
      removeFromFavorites(product.id);
    } else {
      console.log("➕ Adding to favorites");
      addToFavorites(product);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

