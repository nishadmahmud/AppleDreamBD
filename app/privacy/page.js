export default function PrivacyPage() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">Privacy Policy</span>
          </nav>
        </div>

        {/* Hero / Header */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">Last updated: Oct 2024</span>
              <span className="hidden md:inline text-xs text-gray-500 dark:text-gray-400">Effective immediately</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">How we collect, use, share, and protect your information across our website, checkout, and customer support experiences.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <aside className="lg:col-span-1 order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">On this page</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#collect">Information We Collect</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#use">How We Use Information</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#share">Data Sharing</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#security">Data Security</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#rights">Your Rights</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#cookies">Cookies</a></li>
                <li><a className="text-gray-600 dark:text-gray-400 hover:text-primary" href="#contact">Contact</a></li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <section id="collect" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li>Account details (name, email, contact info) you provide.</li>
                  <li>Order and payment details processed by secure gateways.</li>
                  <li>Usage data (pages visited, device type, browser) to improve the site.</li>
                </ul>
              </div>
            </section>

            <section id="use" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">How We Use Information</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li>To process and fulfill orders, and provide customer support.</li>
                  <li>To personalize content, recommendations, and marketing (with consent where required).</li>
                  <li>To improve performance, security, and reliability.</li>
                </ul>
              </div>
            </section>

            <section id="share" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Data Sharing</h2>
              <p className="text-gray-700 dark:text-gray-300">We do not sell your data. Limited sharing with logistics and payment partners is performed strictly to fulfill orders and provide services you request.</p>
            </section>

            <section id="security" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300">We use industry-standard practices to protect your data during transmission and storage, including HTTPS, limited access controls, and periodic reviews.</p>
            </section>

            <section id="rights" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li>Access, correction, or deletion requests where applicable.</li>
                  <li>Opt-out of marketing emails at any time.</li>
                  <li>Request a copy of your data in a portable format where required by law.</li>
                </ul>
              </div>
            </section>

            <section id="cookies" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300">We use cookies to keep you signed in, remember preferences, and analyze site usage. You can control cookies via your browser settings.</p>
            </section>

            <section id="contact" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">Questions or requests? <a href="/contact" className="text-primary hover:underline">Contact our support team</a> and we’ll get back to you promptly.</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}


