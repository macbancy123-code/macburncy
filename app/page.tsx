import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductSection />
      <AboutSection />
      <ReviewsSection />
      
      {/* Additional sections can go here */}
    </div>
  );
}
