"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are processed in 1-2 business days. Standard delivery arrives in 2-5 business days depending on location.",
  },
  {
    q: "What is your return policy?",
    a: "Returns are accepted within 7 days of delivery for unused items in original packaging with proof of purchase.",
  },
  {
    q: "Do you offer warranty?",
    a: "Most products include a limited manufacturer warranty against defects. See our Warranty page for details.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept major cards and popular local gateways. Payments are processed securely via our partners.",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you'll receive tracking details by email/SMS. You can also view status in your account (if applicable).",
  },
  {
    q: "Can I change my shipping address after ordering?",
    a: "If your order hasn't shipped, contact support immediately. We’ll try to update the address before dispatch.",
  },
  {
    q: "How do I cancel my order?",
    a: "You can request a cancellation before shipment. After dispatch, please initiate a return once delivered.",
  },
  {
    q: "My item arrived damaged. What should I do?",
    a: "Report the issue within 48 hours with photos of the packaging and item. We'll assist with a replacement or refund.",
  },
  {
    q: "Do you provide invoices for business purchases?",
    a: "Yes. Reply to your order confirmation with your business details to receive a VAT-compliant invoice if applicable.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within Bangladesh. International shipping is under review and may be introduced later.",
  },
  {
    q: "Is gift wrapping available?",
    a: "Gift wrapping is available on select items during checkout. Fees may apply.",
  },
  {
    q: "I can't access my account. How can I reset my password?",
    a: "Use the 'Forgot password' link on the sign-in page. If you still need help, contact support for assistance.",
  },
];

function FAQItem({ item, idx, openIdx, setOpenIdx }) {
  const isOpen = openIdx === idx;
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60">
      <button
        className="w-full flex items-center justify-between gap-4 p-5"
        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
        aria-expanded={isOpen}
      >
        <span className="text-left text-base md:text-lg font-semibold text-gray-900 dark:text-white">{item.q}</span>
        <span className="text-gray-500 dark:text-gray-400">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-gray-700 dark:text-gray-300">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">FAQ</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">Answers to common questions about shipping, returns, warranty, payments, and more.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar CTA */}
          <aside className="lg:col-span-1 order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Still need help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get in touch with our support team.</p>
              <a href="/contact" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90">Contact Us</a>
            </div>
          </aside>

          {/* FAQ list */}
          <div className="lg:col-span-3 space-y-4">
            {faqs.map((item, idx) => (
              <FAQItem key={idx} item={item} idx={idx} openIdx={openIdx} setOpenIdx={setOpenIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


