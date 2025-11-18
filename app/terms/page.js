import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read Apple Dream BD’s terms of service covering purchases, product availability, liability, and dispute resolution.",
};

export default function TermsPage() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">
              Terms of Service
            </span>
          </nav>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                Last updated: Oct 2024
              </span>
              <span className="hidden md:inline text-xs text-gray-500 dark:text-gray-400">
                Effective immediately
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Please read these terms carefully. They outline your rights and
              obligations when using Apple Dream BD services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-1 order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                On this page
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#use"
                  >
                    Use of Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#accounts"
                  >
                    Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#purchases"
                  >
                    Purchases & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#ip"
                  >
                    Content & IP
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#liability"
                  >
                    Limitation of Liability
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#changes"
                  >
                    Changes to Terms
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-primary"
                    href="#contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <section
              id="use"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing our site, you agree to comply with applicable laws
                and not misuse the service, including interference, unauthorized
                access, or data scraping.
              </p>
            </section>

            <section
              id="accounts"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">Accounts</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account and password.
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account.
                </li>
                <li>
                  We may suspend or terminate accounts that violate these terms.
                </li>
              </ul>
            </section>

            <section
              id="purchases"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">
                Purchases & Pricing
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  All purchases are subject to availability and acceptance.
                </li>
                <li>
                  Prices, promotions, and offers may change without prior
                  notice.
                </li>
                <li>
                  We reserve the right to cancel or refuse orders at our
                  discretion.
                </li>
              </ul>
            </section>

            <section
              id="ip"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">
                Content & Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                All trademarks, graphics, and content are the property of their
                respective owners. You agree not to copy, distribute, or create
                derivative works without permission.
              </p>
            </section>

            <section
              id="liability"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                To the maximum extent permitted by law, we are not liable for
                indirect, incidental, or consequential damages arising from the
                use of our services.
              </p>
            </section>

            <section
              id="changes"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update these terms periodically. Your continued use of
                the site constitutes acceptance of the updated terms.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/60 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Have questions about these terms?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
                &apos;ll get back to you promptly.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
