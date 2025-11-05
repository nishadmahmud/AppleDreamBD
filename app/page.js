import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedSmartphones from "./components/FeaturedSmartphones";
import BestSellers from "./components/BestSellers";
import BestDeals from "./components/BestDeals";
import DealOfDay from "./components/DealOfDay";
import NewArrivals from "./components/NewArrivals";
import TopAccessories from "./components/TopAccessories";
import DiscoverMore from "./components/DiscoverMore";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col pt-16">
        <Navbar />
        <main className="flex-1 bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Hero />
          <Categories />
          <FeaturedSmartphones />
          <section id="best-sellers">
            <BestSellers />
          </section>
          <section id="deals">
            <BestDeals />
          </section>
          <DealOfDay />
          <section id="new-arrivals">
            <NewArrivals />
          </section>
          <TopAccessories />
          <DiscoverMore />
          <Testimonials />
        </main>
        
      </div>
    </div>
  );
}
