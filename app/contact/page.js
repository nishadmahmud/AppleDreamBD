"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    // Here you could POST to an API route or external service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">Contact</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">Questions, feedback, or support requests — we’re here to help.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6">
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email: info@appledream.com</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone: +1 (234) 567-890</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">123 Tech Street, Dhaka, Bangladesh</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6">
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sat - Thu: 10:00AM - 8:00PM</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Friday: Closed</p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/60 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={form.email} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/60 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/60 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/60 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Write your message here" required />
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-60">
                  Send Message
                </button>
                {submitted && <span className="text-sm text-green-600">Sent! We will get back to you shortly.</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


