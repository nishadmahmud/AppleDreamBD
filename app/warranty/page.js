import Link from "next/link";
export default function WarrantyPage() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">Warranty</span>
          </nav>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Warranty
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Coverage, exclusions, and how to claim warranty services.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Warranty Coverage</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Limited warranty against manufacturing defects.</li>
                <li>Coverage period varies by product category and brand.</li>
                <li>Repairs or replacements are provided at our discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How to Claim</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Keep your proof of purchase and product serial number.</li>
                <li>Contact support with your order ID and issue details.</li>
                <li>Ship or drop off the item as instructed for inspection.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Exclusions</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Physical damage, liquid damage, or misuse.</li>
                <li>Unauthorized repairs or modifications.</li>
                <li>Consumables and normal wear and tear.</li>
              </ul>
            </section>
          </div>

          <aside className="bg-white dark:bg-background-dark/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-2">Claim Assistance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We&apos;ll guide you through the process step by step.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
            >
              Start a Claim
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
