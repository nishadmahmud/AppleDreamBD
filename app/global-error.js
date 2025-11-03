"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Animated error icon */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.7)",
                        "0 0 0 20px rgba(239, 68, 68, 0)",
                        "0 0 0 0 rgba(239, 68, 68, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertTriangle className="w-16 h-16 text-white" />
                  </motion.div>

                  {/* Pulse rings */}
                  <motion.div
                    className="absolute inset-0 border-4 border-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Error message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                  Critical Error
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  A critical error occurred. Please try refreshing the page.
                </p>
                {error?.message && (
                  <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg inline-block mt-4">
                    {error.message}
                  </p>
                )}
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset Application
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Home className="w-5 h-5" />
                    Go Home
                  </Link>
                </motion.div>
              </motion.div>

              {/* Help text */}
              <motion.div
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  If this problem persists, please contact our support team.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

