"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Loaded cart from localStorage:", parsedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error("Failed to parse cart:", error);
        }
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      console.log("Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product, quantity = 1) => {
    console.log("🛒 ADD TO CART CALLED");
    console.log("Product:", product);
    console.log("Quantity:", quantity);
    console.log("Current cart:", cart);
    
    setCart((prevCart) => {
      console.log("Previous cart:", prevCart);
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        console.log("✅ Item exists, updating quantity");
        const newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log("New cart after update:", newCart);
        return newCart;
      } else {
        console.log("✅ Adding new item to cart");
        const newCart = [...prevCart, { ...product, quantity }];
        console.log("New cart after add:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.retails_price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getCartTotal,
        getCartCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

