import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Newsletter from "@/components/Newsletter";
import TextWithContactButton from "@/components/TextWithContactButton";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-2xl md:text-7xl font-black text-gray-900 tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
              Find the Best Rentals
              <span className="block text-primary"> in United States</span>
            </h1>
            <p className="text-sm text-black max-w-xl mx-auto mb-10">
              Discover premium rental opportunities, from single-family homes to
              condos and townhomes across United States
            </p>

            <div className="mt-8 max-w-3xl mx-auto">
              <SearchBar variant="hero" />
            </div>

            {/* Business Categories Quick Links */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: "🏢",
                  title: "Offices",
                  link: "/offices-for-lease",
                  count: "250+",
                },
                {
                  icon: "🏠",
                  title: "Single Family Homes",
                  link: "/single-family-homes",
                  count: "180+",
                },
                {
                  icon: "🏬",
                  title: "Condos",
                  link: "/apartments",
                  count: "120+",
                },
                {
                  icon: "🏘️",
                  title: "Townhomes",
                  link: "/townhomes",
                  count: "90+",
                },
              ].map((category) => (
                <Link
                  key={category.title}
                  href={category.link}
                  className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-primary font-bold">{category.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Stats Section */}
      <div className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,500+", label: "Active Listings" },
              { number: "500+", label: "Successful Sales" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextWithContactButton
        title="Are you looking to rent a home?"
        subtitle="Not sure where to start?"
        textContent="Looking for the perfect space to rent for your family? We have a wide range of rentals to choose from, including single-family homes, condos, and townhomes. Contact us today to find the right rental for your needs!"
        imgSrc="/contact-img/person.png"
      />
      {/* Cities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Rentals for sale in{" "}
            <span className="text-bold text-transparent bg-clip-text  bg-gradient-to-r from-primary to-secondary">
              your city
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore top cities across Canada
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Texas Cities */}
          {[
            { name: "Texas", image: "/texas.jpg" },
            { name: "Florida", image: "/florida.jpg" },
            { name: "California", image: "/california.jpg" },
            { name: "New York", image: "/newyork.jpg" },
            { name: "Arizona", image: "/arizona.jpg" },
            { name: "Georgia", image: "/georgia.jpg" },
            { name: "Colorado", image: "/colorado.jpg" },
            { name: "Illinois", image: "/illinois.jpg" },
          ].map((city) => (
            <Link
              key={city.name}
              href={`/${city.name.toLowerCase()}`}
              className="group relative rounded-lg overflow-hidden aspect-[4/3]"
            >
              <Image
                src={city.image}
                alt={`${city.name} cityscape`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {city.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <div
        id="categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/restaurant-for-sale"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/restaurant.webp"
              alt="Restaurant interior"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white">
                Single Family Homes
              </h3>
              <p className="mt-2 text-sm text-gray-200">
                Browse available single family homes
              </p>
            </div>
          </Link>

          <Link
            href="/convenience-store-for-sale"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/store.jpg"
              alt="Convenience store"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white">
                Condos for Sale
              </h3>
              <p className="mt-2 text-sm text-gray-200">
                Explore condo opportunities
              </p>
            </div>
          </Link>

          <Link
            href="/offices-for-lease"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/office.jpeg"
              alt="Modern office space"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white">
                Townhomes for Sale
              </h3>
              <p className="mt-2 text-sm text-gray-200">
                Find the perfect townhome for your family
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
