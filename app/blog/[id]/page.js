"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, BookOpen, Share2, User } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchBlogs } from "../../../lib/api";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id || params?.slug;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (!blogId) return;

    const loadBlog = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();
        
        // Handle different response structures
        const blogList = response?.data || response?.blogs || response || [];
        
        if (!Array.isArray(blogList)) {
          setError("Invalid blog data format");
          return;
        }

        // Find the blog by ID or slug
        const foundBlog = blogList.find(
          (b) => 
            b.id?.toString() === blogId?.toString() || 
            b.slug === blogId ||
            b.url?.includes(blogId)
        );

        if (foundBlog) {
          setBlog(foundBlog);
          
          // Get related blogs (exclude current, limit to 3)
          const related = blogList
            .filter((b) => 
              b.id !== foundBlog.id && 
              (b.category === foundBlog.category || b.tags?.some(tag => foundBlog.tags?.includes(tag)))
            )
            .slice(0, 3);
          
          // If no related by category/tags, just get other blogs
          if (related.length === 0) {
            setRelatedBlogs(blogList.filter((b) => b.id !== foundBlog.id).slice(0, 3));
          } else {
            setRelatedBlogs(related);
          }
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load blog post");
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogId]);

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title || blog.name,
          text: blog.excerpt || blog.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading blog post...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
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
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      
      {/* Back button */}
      <div className="pt-20 pb-6 px-4 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
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

      {/* Blog Content */}
      <article className="pb-20 px-4 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {(blog.image || blog.featured_image || blog.thumbnail) && (
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={blog.image || blog.featured_image || blog.thumbnail}
                alt={blog.title || blog.name || "Blog post"}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </motion.div>
          )}

          {/* Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Category/Tags */}
            {(blog.category || blog.tags) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category && (
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold rounded-full">
                    {blog.category}
                  </span>
                )}
                {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title || blog.name || "Untitled Post"}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              {(blog.date || blog.created_at || blog.published_at) && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.date || blog.created_at || blog.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {blog.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.read_time} min read</span>
                </div>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {blog.content ? (
              <div 
                className="blog-content text-gray-700 dark:text-gray-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : blog.description ? (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 whitespace-pre-line">
                {blog.description}
              </div>
            ) : blog.excerpt ? (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                {blog.excerpt}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No content available for this post.</p>
            )}
          </motion.div>

          {/* Share Section */}
          <motion.div
            className="py-8 border-t border-b border-gray-200 dark:border-gray-700 my-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enjoyed this post?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share it with your friends!
                </p>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors font-semibold"
              >
                <Share2 className="h-5 w-5" />
                Share Post
              </button>
            </div>
          </motion.div>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id || relatedBlog.slug}
                    href={`/blog/${relatedBlog.id || relatedBlog.slug}`}
                    className="group"
                  >
                    <motion.article
                      className="bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
                      whileHover={{ y: -4 }}
                    >
                      {relatedBlog.image || relatedBlog.featured_image ? (
                        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <Image
                            src={relatedBlog.image || relatedBlog.featured_image}
                            alt={relatedBlog.title || relatedBlog.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : null}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedBlog.title || relatedBlog.name}
                        </h3>
                        {(relatedBlog.excerpt || relatedBlog.description) && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {relatedBlog.excerpt || relatedBlog.description}
                          </p>
                        )}
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}

