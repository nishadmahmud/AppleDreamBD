"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, getCartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const [step, setStep] = useState(1); // 1: Cart Review, 2: Shipping, 3: Payment, 4: Confirmation
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, bkash, nagad, card
  const [orderNotes, setOrderNotes] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      // Allow staying on page if on confirmation step
      if (step !== 4) {
        setTimeout(() => {
          router.push("/products");
        }, 2000);
      }
    }
  }, [cart, router, step]);

  const subtotal = getCartTotal ? getCartTotal() : 0;
  const shippingCost = subtotal > 5000 ? 0 : 100; // Free shipping over ৳5000
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert("Please agree to terms and conditions");
      return;
    }

    setLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally send order to backend API
    const orderData = {
      items: cart,
      shipping: shippingInfo,
      payment: paymentMethod,
      notes: orderNotes,
      totals: { subtotal, shippingCost, tax, total },
      timestamp: new Date().toISOString(),
    };
    
    console.log("Order placed:", orderData);
    
    // Clear cart and show confirmation
    clearCart();
    setLoading(false);
    setStep(4);
  };

  // Empty cart UI
  if ((!cart || cart.length === 0) && step !== 4) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-md mx-auto text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Add some products to your cart before checking out
              </p>
              <button
                onClick={() => router.push("/products")}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </div>
        
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => step === 1 ? router.push("/products") : setStep(step - 1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              {step === 1 ? "Continue Shopping" : "Back"}
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
          </motion.div>

          {/* Progress Steps */}
          {step !== 4 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center gap-4">
                {[
                  { num: 1, label: "Cart" },
                  { num: 2, label: "Shipping" },
                  { num: 3, label: "Payment" },
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                          step >= s.num
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                      </div>
                      <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{s.label}</span>
                    </div>
                    {i < 2 && (
                      <div
                        className={`w-20 h-1 mx-2 transition-colors ${
                          step > s.num ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Cart Review */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                      Order Summary ({getCartCount()} items)
                    </h2>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                            <Image
                              src={item.image_path || "/placeholder.png"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-primary font-bold">৳{item.retails_price}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-primary"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-primary"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-colors"
                    >
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Shipping Information */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                      Shipping Information
                    </h2>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          <User className="inline h-4 w-4 mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            <Mail className="inline h-4 w-4 mr-2" />
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            <Phone className="inline h-4 w-4 mr-2" />
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          <MapPin className="inline h-4 w-4 mr-2" />
                          Address *
                        </label>
                        <textarea
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          rows="3"
                          placeholder="House/Flat, Street, Area"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Dhaka"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingInfo.postalCode}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="1200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Country
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.country}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                      Payment Method
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                      {[
                        { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
                        { id: "bkash", label: "bKash", icon: "📱", desc: "Mobile payment" },
                        { id: "nagad", label: "Nagad", icon: "📱", desc: "Mobile payment" },
                        { id: "card", label: "Credit/Debit Card", icon: "💳", desc: "Secure payment" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-primary"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">{method.label}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{method.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="3"
                        placeholder="Any special instructions..."
                      />
                    </div>

                    <label className="flex items-start gap-3 mb-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading || !agreedToTerms}
                      className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5" />
                          Place Order - ৳{total.toFixed(2)}
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      Order Placed Successfully!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Thank you for your order, {shippingInfo.fullName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                      We've sent a confirmation email to {shippingInfo.email}
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 text-left">
                      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Order Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                          <span className="font-mono text-gray-900 dark:text-white">#APD{Date.now().toString().slice(-8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                          <span className="text-gray-900 dark:text-white capitalize">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Delivery to:</span>
                          <span className="text-gray-900 dark:text-white">{shippingInfo.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => router.push("/products")}
                        className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={() => router.push("/")}
                        className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-colors"
                      >
                        Go Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            {step !== 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {shippingCost === 0 ? "FREE" : `৳${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax (5%)</span>
                      <span className="font-medium text-gray-900 dark:text-white">৳{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary">৳{total.toFixed(2)}</span>
                  </div>

                  {shippingCost === 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
                        <Truck className="h-4 w-4" />
                        <span className="font-medium">Free Shipping Applied!</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>3-7 days delivery</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

