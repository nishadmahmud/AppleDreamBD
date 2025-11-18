import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://appledreambd.com";
const siteUrl = rawSiteUrl.startsWith("http")
  ? rawSiteUrl
  : `https://${rawSiteUrl.replace(/^\/+/, "")}`;
const siteName = "Apple Dream BD";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Tech Retailer`,
    template: `%s | ${siteName}`,
  },
  description:
    "Apple Dream BD brings the latest official and unofficial smartphones, wearables, and premium accessories to Bangladesh with fast delivery and reliable after-sales support.",
  applicationName: siteName,
  keywords: [
    "Apple Dream BD",
    "smartphones Bangladesh",
    "official apple reseller",
    "premium gadgets",
    "tech accessories Dhaka",
  ],
  authors: [{ name: siteName }],
  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon" },
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: `${siteName} | Premium Tech Retailer`,
    description:
      "Shop the newest iPhone, Android flagships, wearables, and accessories with installment support at Apple Dream BD.",
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${siteName} Logo`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Premium Tech Retailer`,
    description:
      "Discover curated flagship deals, brand-wise collections, and authentic accessories at Apple Dream BD.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Material Symbols no longer needed; using lucide-react */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  console.log('Initial theme from localStorage:', theme);
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  console.log('HTML classes after init:', document.documentElement.classList.toString());
                } catch (e) {
                  console.error('Theme init error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 transition-colors duration-300`}
      >
        <ThemeProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navbar />
              <main className="pt-16">{children}</main>
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
