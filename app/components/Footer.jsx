"use client";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/Apple-Dream/61552855422966/",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  const quickLinks = [
    { title: "Products", href: "/products" },
    { title: "Blog", href: "/blog" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { title: "Shipping & Returns", href: "/shipping-returns" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Warranty", href: "/warranty" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background-light to-gray-100 dark:from-background-dark dark:to-black text-gray-700 dark:text-gray-300 transition-colors duration-300 border-t border-gray-200/60 dark:border-gray-800/60 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            style={{
              left: `${i * 40}%`,
              top: `${i * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full mx-auto px-4 py-12 sm:px-8 lg:px-10">
        {/* Top Section - Mobile layout */}
        <div className="lg:hidden flex flex-col gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                unoptimized
                src="/logo.png"
                alt="Apple Dream BD"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-primary">
                Apple Dream BD
              </span>
            </motion.a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Your premium destination for the latest tech. Quality products,
              exceptional service, unbeatable prices.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <motion.div
                className="flex items-start gap-2 text-sm"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Level #4, Block #A Shop# 41C, Dhaka, Bangladesh</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick + Support two-column on mobile */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      <span>{link.title}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Support
              </h3>
              <ul className="flex flex-col gap-3">
                {supportLinks.map((link, i) => (
                  <motion.li
                    key={link.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      <span>{link.title}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-6 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <motion.a
                href="mailto:appledream2509@gmail.com"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">
                  appledream2509@gmail.com
                </span>
              </motion.a>
              <motion.a
                href="https://wa.me/8801320878981"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">+880 1320-878981</span>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/people/Apple-Dream/61552855422966/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Facebook className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">Facebook</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Top Section - Desktop/Tablet layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                unoptimized
                src="/logo.png"
                alt="Apple Dream BD"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-primary">
                Apple Dream BD
              </span>
            </motion.a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Your premium destination for the latest tech. Quality products,
              exceptional service, unbeatable prices.
            </p>
            <div className="flex flex-col gap-3">
              <motion.div
                className="flex items-start gap-2 text-sm"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Level #4, Block #A Shop# 41C, Dhaka, Bangladesh</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-6 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    <span>{link.title}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link, i) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    <span>{link.title}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-6 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <motion.a
                href="mailto:appledream2509@gmail.com"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">
                  appledream2509@gmail.com
                </span>
              </motion.a>
              <motion.a
                href="https://wa.me/8801320878981"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">+880 1320-878981</span>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/people/Apple-Dream/61552855422966/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Facebook className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">Facebook</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.hr
          className="border-gray-300 dark:border-gray-800 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2024{" "}
            <a
              href="#"
              className="font-semibold hover:text-primary transition-colors"
            >
              Apple Dream BD™
            </a>
            . All Rights Reserved.
          </motion.p>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Secure Payment
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Free Shipping
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              24/7 Support
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Money Back Guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
