import Hero from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects-section";
import Heading from "@/components/Heading";
import TextWithContactButton from "@/components/TextWithContactButton";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Featured Rentals Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <div className="mb-8">
            <Heading city="FEATURED RENTALS" />
          </div>
          <ProjectsSection />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <TextWithContactButton
        title="Looking for Your Perfect Home in Texas?"
        subtitle="Let us help you find your ideal rental"
        textContent="We specialize in providing high-quality rental properties across Texas. Whether you're looking for a cozy apartment in Austin, a family home in Dallas, or a modern loft in Houston, we have the perfect place for you. Our properties come with professional property management, 24/7 maintenance support, and a seamless rental experience."
        imgSrc="/contact-img/texas-home.png"
      />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}
