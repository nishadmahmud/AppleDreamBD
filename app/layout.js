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

export const metadata = {
  title: {
    default: "AppleDream",
    template: "%s | AppleDream",
  },
  description:
    "AppleDream curates the latest Apple devices, accessories, and exclusive deals for tech enthusiasts.",
  keywords: [
    "AppleDream",
    "Apple store",
    "iPhone deals",
    "MacBook accessories",
    "premium tech",
  ],
  authors: [{ name: "AppleDream" }],
  creator: "AppleDream",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    title: "AppleDream",
    description:
      "Explore curated Apple devices, accessories, and offers at AppleDream.",
    url: "/",
    siteName: "AppleDream",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 512,
        height: 512,
        alt: "AppleDream icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppleDream",
    description:
      "Discover the latest Apple devices, accessories, and offers on AppleDream.",
    images: ["/favicon.ico"],
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
