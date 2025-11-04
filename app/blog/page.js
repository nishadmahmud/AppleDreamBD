"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogs } from "../../lib/api";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();
        
        // Handle different response structures
        const blogList = response?.data || response?.blogs || response || [];
        
        if (Array.isArray(blogList)) {
          setBlogs(blogList);
        } else {
          setError("Invalid blog data format");
        }
      } catch (err) {
        setError(err.message || "Failed to load blogs");
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading blogs...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Blogs</h1>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Latest Blog Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest tech news, product reviews, and shopping guides
            </p>
          </motion.div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No blogs found</h2>
              <p className="text-gray-600 dark:text-gray-400">Check back later for new posts!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <Link
                  key={blog.id || blog.slug || index}
                  href={`/blog/${blog.id || blog.slug || blog.url?.split('/').pop() || 'unknown'}`}
                >
                  <motion.article
                    className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col group h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                  {/* Image */}
                  {blog.image || blog.featured_image || blog.thumbnail ? (
                    <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <Image
                        src={blog.image || blog.featured_image || blog.thumbnail}
                        alt={blog.title || blog.name || "Blog post"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/40" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {blog.date || blog.created_at ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(blog.date || blog.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ) : null}
                      {blog.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{blog.read_time} min read</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title || blog.name || "Untitled Post"}
                    </h2>

                    {/* Excerpt */}
                    {(blog.excerpt || blog.description || blog.content) && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                        {blog.excerpt || blog.description || (blog.content ? blog.content.substring(0, 150) + "..." : "")}
                      </p>
                    )}

                    {/* Read More */}
                    <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-auto group/link">
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

