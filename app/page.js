import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedSmartphones from "./components/FeaturedSmartphones";
import DealOfDay from "./components/DealOfDay";
import TopAccessories from "./components/TopAccessories";
import DiscoverMore from "./components/DiscoverMore";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col pt-16">
        <Navbar />
        <main className="flex-1 bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Hero />
          <FeaturedSmartphones />
          <DealOfDay />
          <TopAccessories />
          <DiscoverMore />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  );
}
