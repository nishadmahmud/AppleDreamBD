import Link from "next/link";
export default function ShippingReturnsPage() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">
              Shipping & Returns
            </span>
          </nav>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Shipping & Returns
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Clear information on delivery timelines, shipping fees, returns, and
          refunds.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Shipping</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Processing time: 1-2 business days.</li>
                <li>
                  Estimated delivery: 2-5 business days (location dependent).
                </li>
                <li>
                  Same-day delivery is available in select cities for an extra
                  fee.
                </li>
                <li>
                  Tracking details are shared via email/SMS once dispatched.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Shipping Fees</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders ৳2,000+ qualify for free standard delivery.</li>
                <li>
                  Standard delivery: ৳89 – ৳149 based on location and weight.
                </li>
                <li>Express delivery: calculated at checkout.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Returns</h2>
              <p className="mb-3">
                Request a return within 7 days of delivery if the item is:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Unused and in original condition, with all accessories.</li>
                <li>Packed in the original manufacturer packaging.</li>
                <li>Accompanied by proof of purchase (order ID/invoice).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Refunds</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refunds issued to the original payment method.</li>
                <li>Processing time: 5-10 business days after inspection.</li>
                <li>
                  Partial refunds may apply if any item is missing or damaged.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                Non-Returnable Items
              </h2>
              <p>
                Opened consumables, software licenses, and items with physical
                damage not caused during shipping.
              </p>
            </section>
          </div>

          <aside className="bg-white dark:bg-background-dark/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Our support team is here to assist you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
            >
              Contact Support
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
