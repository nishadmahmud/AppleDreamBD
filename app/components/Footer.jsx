"use client";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  const quickLinks = [
    { title: "About Us", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Careers", href: "#" },
    { title: "FAQ", href: "#" },
  ];

  const supportLinks = [
    { title: "Shipping & Returns", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Warranty", href: "#" },
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
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Dream BD"
                width={28}
                height={20}
                className="dark:invert"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Apple Dream BD
              </span>
            </motion.a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Your premium destination for the latest tech. Quality products, exceptional service, unbeatable prices.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <motion.a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-890</span>
              </motion.a>
              <motion.a
                href="mailto:info@appledream.com"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4" />
                <span>info@appledream.com</span>
              </motion.a>
              <motion.div
                className="flex items-start gap-2 text-sm"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Dhaka, Bangladesh</span>
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

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-6 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe for exclusive deals and updates!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white dark:bg-background-dark/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <motion.button
                type="submit"
                className="relative overflow-hidden bg-primary text-white font-semibold py-3 px-6 rounded-xl text-sm hover:bg-primary/90 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Subscribed!
                  </motion.span>
                ) : (
                  <>
                    Subscribe
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Subscribe</span>
                  </>
                )}
              </motion.button>
            </form>
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
            <a href="#" className="font-semibold hover:text-primary transition-colors">
              Apple Dream BD™
            </a>
            . All Rights Reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center md:justify-end gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-background-dark/60 text-gray-600 dark:text-gray-400 ${social.color} border border-gray-200 dark:border-gray-700 transition-all`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <span className="text-xs font-semibold uppercase tracking-wider">Secure Payment</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Free Shipping</span>
            <span className="text-xs font-semibold uppercase tracking-wider">24/7 Support</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Money Back Guarantee</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
